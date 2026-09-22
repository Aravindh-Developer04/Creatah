<?php
/**
 * Users API Endpoint
 * Supports:
 *   POST: Registers/Inserts user from JSON payload
 *   GET:  Fetches all registered users as JSON
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

// Auto-create users table if not exists
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

// 1. GET Request: Returns all users or single user as clean JSON
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Fetch single user by ID: GET /users.php?id=1
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT id, name, email, gender, country, created_at FROM users WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => (int)$_GET['id']]);
            $user = $stmt->fetch();

            if (!$user) {
                sendResponse(false, 'User not found', [], 404);
            }

            sendResponse(true, 'User retrieved successfully', [
                'data' => $user
            ]);
        }

        // Search users: GET /users.php?q=Hari
        if (!empty($_GET['q'])) {
            $q = trim($_GET['q']);
            $stmt = $pdo->prepare("SELECT id, name, email, gender, country, created_at FROM users WHERE name LIKE :q OR email LIKE :q ORDER BY id DESC");
            $stmt->execute([':q' => "%{$q}%"]);
            $users = $stmt->fetchAll();

            sendResponse(true, 'Users search results', [
                'count' => count($users),
                'data'  => $users
            ]);
        }

        // Default: Fetch all users
        $stmt = $pdo->query("SELECT id, name, email, gender, country, created_at FROM users ORDER BY id DESC");
        $users = $stmt->fetchAll();
        sendResponse(true, 'Users retrieved successfully', [
            'count' => count($users),
            'data'  => $users
        ]);
    } catch (PDOException $e) {
        sendResponse(false, 'Database query error: ' . $e->getMessage(), [], 500);
    }
}

// 2. POST Request: Inserts new user from JSON
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    if (!$input) {
        sendResponse(false, 'Invalid JSON payload received.', [], 400);
    }

    $name     = trim($input['name'] ?? '');
    $email    = trim($input['email'] ?? '');
    $password = trim($input['password'] ?? '');
    $gender   = trim($input['gender'] ?? '');
    $country  = trim($input['country'] ?? '');

    // Basic Validations
    if (empty($name)) {
        sendResponse(false, 'Name is required.', [], 422);
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(false, 'A valid email address is required.', [], 422);
    }

    // Hash password if provided, or empty string
    $hashedPassword = !empty($password) ? password_hash($password, PASSWORD_DEFAULT) : '';

    try {
        $stmt = $pdo->prepare("
            INSERT INTO users (name, email, password, gender, country)
            VALUES (:name, :email, :password, :gender, :country)
        ");

        $stmt->execute([
            ':name'     => $name,
            ':email'    => $email,
            ':password' => $hashedPassword,
            ':gender'   => $gender,
            ':country'  => $country,
        ]);

        $userId = $pdo->lastInsertId();

        sendResponse(true, 'User registered successfully!', [
            'user' => [
                'id'      => $userId,
                'name'    => $name,
                'email'   => $email,
                'gender'  => $gender,
                'country' => $country
            ]
        ], 201);

    } catch (PDOException $e) {
        sendResponse(false, 'Database insert error: ' . $e->getMessage(), [], 500);
    }
}

sendResponse(false, 'Method not allowed. Only GET and POST requests are accepted.', [], 405);
