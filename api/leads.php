<?php
/**
 * Protected Leads, Applications & Analytics API
 * Creatah Software Technologies
 * 
 * Requires: Authorization: Bearer <token>
 */

require_once __DIR__ . '/config.php';

if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
}

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 1. Verify Authorization Token
$secretKey = getenv('ADMIN_JWT_SECRET') ?: 'creatah_secure_admin_jwt_secret_key_2026_x!9';

$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
if (empty($authHeader) && function_exists('apache_request_headers')) {
    $headers = apache_request_headers();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
}

$token = '';
if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
    $token = trim($matches[1]);
} elseif (!empty($_GET['token'])) {
    $token = trim($_GET['token']);
}

if (empty($token)) {
    sendResponse(false, 'Unauthorized. Authentication token is required.', [], 401);
}

$parts = explode('.', $token);
if (count($parts) !== 2) {
    sendResponse(false, 'Unauthorized. Malformed authentication token.', [], 401);
}

$payloadEncoded = $parts[0];
$signature = $parts[1];

$expectedSignature = hash_hmac('sha256', $payloadEncoded, $secretKey);
if (!hash_equals($expectedSignature, $signature)) {
    sendResponse(false, 'Unauthorized. Invalid authentication signature.', [], 401);
}

$payload = json_decode(base64_decode($payloadEncoded), true);
if (!$payload || empty($payload['exp']) || time() > $payload['exp']) {
    sendResponse(false, 'Unauthorized. Session expired. Please sign in again.', [], 401);
}

// ==========================================================
// 2. Safe Auto-Create Missing Tables
// ==========================================================
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `leads` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `form_type` VARCHAR(50) NOT NULL DEFAULT 'contact_form',
          `name` VARCHAR(150) NOT NULL,
          `email` VARCHAR(150) NOT NULL,
          `phone` VARCHAR(50) DEFAULT NULL,
          `service` VARCHAR(150) DEFAULT NULL,
          `budget` VARCHAR(100) DEFAULT NULL,
          `timeline` VARCHAR(100) DEFAULT NULL,
          `company` VARCHAR(150) DEFAULT NULL,
          `message` TEXT DEFAULT NULL,
          `ip_address` VARCHAR(45) DEFAULT NULL,
          `status` ENUM('new', 'contacted', 'qualified', 'closed') DEFAULT 'new',
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
} catch (Exception $e) {}

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `job_applications` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `job_title` VARCHAR(150) NOT NULL,
          `applicant_name` VARCHAR(150) NOT NULL,
          `applicant_email` VARCHAR(150) NOT NULL,
          `applicant_phone` VARCHAR(50) NOT NULL,
          `experience_years` VARCHAR(50) DEFAULT NULL,
          `portfolio_url` VARCHAR(255) DEFAULT NULL,
          `linkedin_url` VARCHAR(255) DEFAULT NULL,
          `cover_note` TEXT DEFAULT NULL,
          `status` ENUM('submitted', 'reviewed', 'shortlisted', 'rejected') DEFAULT 'submitted',
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
} catch (Exception $e) {}

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `users` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `name` VARCHAR(150) NOT NULL,
          `email` VARCHAR(150) NOT NULL,
          `password` VARCHAR(255) NOT NULL,
          `gender` VARCHAR(50) DEFAULT NULL,
          `country` VARCHAR(100) DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
} catch (Exception $e) {}

function safeCount($pdo, $sql) {
    try {
        return (int)$pdo->query($sql)->fetchColumn();
    } catch (Exception $e) {
        return 0;
    }
}

// ==========================================================
// 3. Handle Status Update (PUT)
// ==========================================================
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    $id = (int)($input['id'] ?? 0);
    $status = trim($input['status'] ?? '');
    $type = trim($input['type'] ?? 'lead');

    if ($id <= 0 || empty($status)) {
        sendResponse(false, 'Valid record ID and status are required.', [], 422);
    }

    try {
        if ($type === 'application') {
            $stmt = $pdo->prepare("UPDATE job_applications SET status = :status WHERE id = :id");
            $stmt->execute([':status' => $status, ':id' => $id]);
        } else {
            $stmt = $pdo->prepare("UPDATE leads SET status = :status WHERE id = :id");
            $stmt->execute([':status' => $status, ':id' => $id]);
        }

        sendResponse(true, 'Status updated successfully.', ['id' => $id, 'status' => $status]);
    } catch (PDOException $e) {
        sendResponse(false, 'Database update failed: ' . $e->getMessage(), [], 500);
    }
}

// ==========================================================
// 4. Handle Record Deletion (DELETE)
// ==========================================================
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    $type = trim($_GET['type'] ?? 'lead');

    if ($id <= 0) {
        sendResponse(false, 'Valid record ID is required.', [], 422);
    }

    try {
        if ($type === 'application') {
            $stmt = $pdo->prepare("DELETE FROM job_applications WHERE id = :id");
            $stmt->execute([':id' => $id]);
        } elseif ($type === 'user') {
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
            $stmt->execute([':id' => $id]);
        } else {
            $stmt = $pdo->prepare("DELETE FROM leads WHERE id = :id");
            $stmt->execute([':id' => $id]);
        }

        sendResponse(true, 'Record deleted successfully.', ['id' => $id]);
    } catch (PDOException $e) {
        sendResponse(false, 'Database delete failed: ' . $e->getMessage(), [], 500);
    }
}

// ==========================================================
// 5. Handle Record Fetching (GET)
// ==========================================================
$tab = $_GET['tab'] ?? 'leads';
$search = trim($_GET['q'] ?? '');

// Calculate Stats
$stats = [
    'total_leads'     => safeCount($pdo, "SELECT COUNT(*) FROM leads"),
    'contact_leads'   => safeCount($pdo, "SELECT COUNT(*) FROM leads WHERE form_type LIKE '%contact%'"),
    'proposal_leads'  => safeCount($pdo, "SELECT COUNT(*) FROM leads WHERE form_type LIKE '%proposal%'"),
    'estimate_leads'  => safeCount($pdo, "SELECT COUNT(*) FROM leads WHERE form_type LIKE '%estimate%'"),
    'applications'    => safeCount($pdo, "SELECT COUNT(*) FROM job_applications"),
    'users'           => safeCount($pdo, "SELECT COUNT(*) FROM users"),
];

$records = [];
try {
    if ($tab === 'applications') {
        if (!empty($search)) {
            $stmt = $pdo->prepare("
                SELECT * FROM job_applications 
                WHERE applicant_name LIKE :q OR applicant_email LIKE :q OR applicant_phone LIKE :q OR job_title LIKE :q
                ORDER BY created_at DESC LIMIT 200
            ");
            $stmt->execute([':q' => "%{$search}%"]);
        } else {
            $stmt = $pdo->query("SELECT * FROM job_applications ORDER BY created_at DESC LIMIT 200");
        }
        $records = $stmt ? $stmt->fetchAll() : [];
    } elseif ($tab === 'users') {
        if (!empty($search)) {
            $stmt = $pdo->prepare("
                SELECT id, name, email, gender, country, created_at FROM users 
                WHERE name LIKE :q OR email LIKE :q OR country LIKE :q
                ORDER BY created_at DESC LIMIT 200
            ");
            $stmt->execute([':q' => "%{$search}%"]);
        } else {
            $stmt = $pdo->query("SELECT id, name, email, gender, country, created_at FROM users ORDER BY created_at DESC LIMIT 200");
        }
        $records = $stmt ? $stmt->fetchAll() : [];
    } else {
        $filterSql = "";
        $params = [];
        if ($tab === 'contact') {
            $filterSql = "WHERE form_type LIKE '%contact%'";
        } elseif ($tab === 'proposals') {
            $filterSql = "WHERE form_type LIKE '%proposal%'";
        } elseif ($tab === 'estimates') {
            $filterSql = "WHERE form_type LIKE '%estimate%'";
        }

        if (!empty($search)) {
            $filterSql .= ($filterSql ? " AND " : " WHERE ") . "(name LIKE :q OR email LIKE :q OR phone LIKE :q OR service LIKE :q)";
            $params[':q'] = "%{$search}%";
        }

        $stmt = $pdo->prepare("SELECT * FROM leads {$filterSql} ORDER BY created_at DESC LIMIT 200");
        $stmt->execute($params);
        $records = $stmt ? $stmt->fetchAll() : [];
    }
} catch (Exception $e) {
    $records = [];
}

sendResponse(true, 'Admin data retrieved successfully.', [
    'tab'     => $tab,
    'stats'   => $stats,
    'count'   => count($records),
    'records' => $records,
    'admin'   => $payload['user'] ?? 'admin'
]);
