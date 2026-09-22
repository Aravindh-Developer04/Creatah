<?php
/**
 * Contact & Lead Ingestion API Endpoint
 * Method: POST
 * Content-Type: application/json
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

// Auto-create leads table if not exists
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

// 1. GET Request: Returns leads as JSON
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM leads WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => (int)$_GET['id']]);
            $lead = $stmt->fetch();
            if (!$lead) {
                sendResponse(false, 'Lead not found', [], 404);
            }
            sendResponse(true, 'Lead retrieved successfully', ['data' => $lead]);
        }

        $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC LIMIT 100");
        $leads = $stmt->fetchAll();
        sendResponse(true, 'Leads retrieved successfully', [
            'count' => count($leads),
            'data'  => $leads
        ]);
    } catch (PDOException $e) {
        sendResponse(false, 'Database query error: ' . $e->getMessage(), [], 500);
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed. Only GET and POST requests are accepted.', [], 405);
}

// Read raw JSON body
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!$input) {
    sendResponse(false, 'Invalid JSON payload received.', [], 400);
}

// Extract and sanitize fields
$name      = trim($input['name'] ?? '');
$email     = trim($input['email'] ?? '');
$phone     = trim($input['phone'] ?? '');
$service   = trim($input['service'] ?? '');
$budget    = trim($input['budget'] ?? '');
$timeline  = trim($input['timeline'] ?? '');
$company   = trim($input['company'] ?? '');
$message   = trim($input['message'] ?? $input['requirement'] ?? '');
$form_type = trim($input['form_type'] ?? 'contact_form');
$ipAddress = getClientIP();

// Validation
if (empty($name)) {
    sendResponse(false, 'Full name is required.', [], 422);
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'A valid email address is required.', [], 422);
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO leads (
            form_type, name, email, phone, service, budget, timeline, company, message, ip_address
        ) VALUES (
            :form_type, :name, :email, :phone, :service, :budget, :timeline, :company, :message, :ip_address
        )
    ");

    $stmt->execute([
        ':form_type'  => $form_type,
        ':name'       => $name,
        ':email'      => $email,
        ':phone'      => $phone,
        ':service'    => $service,
        ':budget'     => $budget,
        ':timeline'   => $timeline,
        ':company'    => $company,
        ':message'    => $message,
        ':ip_address' => $ipAddress,
    ]);

    $leadId = $pdo->lastInsertId();

    sendResponse(true, 'Thank you! Your inquiry has been submitted successfully.', [
        'lead_id' => $leadId
    ], 201);

} catch (PDOException $e) {
    sendResponse(false, 'Database insert error: ' . $e->getMessage(), [], 500);
}
