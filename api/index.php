<?php
/**
 * Creatah API Front Controller / Router
 * Handles clean extensionless endpoints: /contact, /careers, /users, /view-leads
 */

// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Route based on endpoint name
if (preg_match('#/(?:api/)?contact/?$#', $uri)) {
    require_once __DIR__ . '/contact.php';
    exit;
}

if (preg_match('#/(?:api/)?careers/?$#', $uri)) {
    require_once __DIR__ . '/careers.php';
    exit;
}

if (preg_match('#/(?:api/)?users/?$#', $uri)) {
    require_once __DIR__ . '/users.php';
    exit;
}

if (preg_match('#/(?:api/)?view-leads/?$#', $uri)) {
    require_once __DIR__ . '/view-leads.php';
    exit;
}

// Default API health status
header('Content-Type: application/json; charset=UTF-8');
echo json_encode([
    'status' => 'online',
    'message' => 'Creatah API is running successfully',
    'endpoints' => [
        'contact' => '/api/contact',
        'careers' => '/api/careers',
        'users' => '/api/users',
        'view_leads' => '/api/view-leads'
    ],
    'timestamp' => date('Y-m-d H:i:s')
], JSON_PRETTY_PRINT);
