<?php
/**
 * Admin Authentication & Token Generator API
 * Creatah Software Technologies
 * 
 * Method: POST
 * Payload: { "username": "admin", "password": "..." }
 */

require_once __DIR__ . '/config.php';

// Set Content Type
header('Content-Type: application/json; charset=UTF-8');

// CORS is handled in config.php & .htaccess
if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
}

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Secret key for HMAC token signing (keep server-side)
$secretKey = getenv('ADMIN_JWT_SECRET') ?: 'creatah_secure_admin_jwt_secret_key_2026_x!9';

// ==========================================================
// 1. Auto-Initialize 'admins' Table & Bcrypt Hashed Credentials
// ==========================================================
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `admins` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `username` VARCHAR(50) NOT NULL UNIQUE,
          `email` VARCHAR(150) DEFAULT NULL,
          `password_hash` VARCHAR(255) NOT NULL,
          `role` VARCHAR(50) DEFAULT 'superadmin',
          `last_login` DATETIME DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // If admins table is empty, seed initial superadmin with Bcrypt Hash
    $checkStmt = $pdo->query("SELECT COUNT(*) FROM `admins`");
    if ((int)$checkStmt->fetchColumn() === 0) {
        // Cryptographic Bcrypt hash (Cost factor 12) - NO PLAIN TEXT IN CODE
        $initialHash = '$2y$12$VCoCCc2YGBif2miY4iORFeefbuxLkAMcyoA73YW4o127zkVKGtLti';
        $seedStmt = $pdo->prepare("
            INSERT INTO `admins` (`username`, `email`, `password_hash`, `role`)
            VALUES ('admin', 'admin@creatah.com', :hash, 'superadmin')
        ");
        $seedStmt->execute([':hash' => $initialHash]);
    }
} catch (Exception $e) {
    // Gracefully continue
}

// Read raw JSON input
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

// Verify Token Action (GET or POST ?action=verify)
if ((isset($_GET['action']) && $_GET['action'] === 'verify') || (isset($input['action']) && $input['action'] === 'verify')) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (empty($authHeader) && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }

    $token = '';
    if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        $token = trim($matches[1]);
    } elseif (!empty($input['token'])) {
        $token = trim($input['token']);
    }

    if (empty($token)) {
        sendResponse(false, 'Authorization token is missing.', [], 401);
    }

    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        sendResponse(false, 'Invalid token format.', [], 401);
    }

    $payloadEncoded = $parts[0];
    $signature = $parts[1];

    $expectedSignature = hash_hmac('sha256', $payloadEncoded, $secretKey);
    if (!hash_equals($expectedSignature, $signature)) {
        sendResponse(false, 'Token signature validation failed.', [], 401);
    }

    $payload = json_decode(base64_decode($payloadEncoded), true);
    if (!$payload || empty($payload['exp']) || time() > $payload['exp']) {
        sendResponse(false, 'Token has expired. Please sign in again.', [], 401);
    }

    sendResponse(true, 'Token is valid.', [
        'admin' => $payload['user'] ?? 'admin',
        'role' => $payload['role'] ?? 'superadmin',
        'expires_at' => date('Y-m-d H:i:s', $payload['exp'])
    ]);
}

// Only POST accepted for login
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed. Only POST is accepted.', [], 405);
}

if (!$input) {
    sendResponse(false, 'Invalid JSON payload received.', [], 400);
}

$user = trim($input['username'] ?? '');
$pass = trim($input['password'] ?? '');

if (empty($user) || empty($pass)) {
    sendResponse(false, 'Username and password are required.', [], 422);
}

// ==========================================================
// 2. Query Database for Admin Record
// ==========================================================
try {
    $stmt = $pdo->prepare("
        SELECT `id`, `username`, `email`, `password_hash`, `role`
        FROM `admins`
        WHERE LOWER(`username`) = LOWER(:u1) OR LOWER(`email`) = LOWER(:u2)
        LIMIT 1
    ");
    $stmt->execute([':u1' => $user, ':u2' => $user]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    sendResponse(false, 'Database authentication error: ' . $e->getMessage(), [], 500);
}

// ==========================================================
// 3. Cryptographic Bcrypt Verification
// ==========================================================
$authenticated = false;
if ($admin && !empty($admin['password_hash'])) {
    if (password_verify($pass, $admin['password_hash'])) {
        $authenticated = true;
    }
}

if (!$authenticated) {
    // Artificial delay to prevent brute-force timing attacks
    usleep(300000); // 300ms
    sendResponse(false, 'Invalid username or password.', [], 401);
}

// Update last login timestamp in database
try {
    $updateStmt = $pdo->prepare("UPDATE `admins` SET `last_login` = NOW() WHERE `id` = :id");
    $updateStmt->execute([':id' => $admin['id']]);
} catch (Exception $e) {}

// ==========================================================
// 4. Generate Cryptographic HMAC-SHA256 Bearer Token
// ==========================================================
$expiry = time() + 86400; // 24 hours (86,400 seconds)
$payload = [
    'admin_id' => $admin['id'],
    'user'     => $admin['username'],
    'role'     => $admin['role'] ?? 'superadmin',
    'iat'      => time(),
    'exp'      => $expiry,
    'nonce'    => bin2hex(random_bytes(8))
];

$payloadEncoded = base64_encode(json_encode($payload));
$signature = hash_hmac('sha256', $payloadEncoded, $secretKey);
$token = "{$payloadEncoded}.{$signature}";

sendResponse(true, 'Admin authentication successful.', [
    'token'      => $token,
    'admin'      => $admin['username'],
    'role'       => $admin['role'] ?? 'superadmin',
    'expires_in' => 86400,
    'expires_at' => date('Y-m-d H:i:s', $expiry)
], 200);
