<?php
/**
 * Career Job Application API Endpoint
 * Method: POST
 * Content-Type: application/json
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed. Only POST requests are accepted.', [], 405);
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!$input) {
    sendResponse(false, 'Invalid JSON payload received.', [], 400);
}

$jobTitle        = trim($input['job_title'] ?? $input['role'] ?? 'General Application');
$applicantName   = trim($input['applicant_name'] ?? $input['name'] ?? '');
$applicantEmail  = trim($input['applicant_email'] ?? $input['email'] ?? '');
$applicantPhone  = trim($input['applicant_phone'] ?? $input['phone'] ?? '');
$experienceYears = trim($input['experience_years'] ?? $input['experience'] ?? '');
$portfolioUrl    = trim($input['portfolio_url'] ?? $input['portfolio'] ?? '');
$linkedinUrl     = trim($input['linkedin_url'] ?? $input['linkedin'] ?? '');
$coverNote       = trim($input['cover_note'] ?? $input['message'] ?? '');

if (empty($applicantName)) {
    sendResponse(false, 'Applicant name is required.', [], 422);
}

if (empty($applicantEmail) || !filter_var($applicantEmail, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'A valid email address is required.', [], 422);
}

if (empty($applicantPhone)) {
    sendResponse(false, 'Applicant phone number is required.', [], 422);
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO job_applications (
            job_title, applicant_name, applicant_email, applicant_phone,
            experience_years, portfolio_url, linkedin_url, cover_note
        ) VALUES (
            :job_title, :applicant_name, :applicant_email, :applicant_phone,
            :experience_years, :portfolio_url, :linkedin_url, :cover_note
        )
    ");

    $stmt->execute([
        ':job_title'        => $jobTitle,
        ':applicant_name'   => $applicantName,
        ':applicant_email'  => $applicantEmail,
        ':applicant_phone'  => $applicantPhone,
        ':experience_years' => $experienceYears,
        ':portfolio_url'    => $portfolioUrl,
        ':linkedin_url'     => $linkedinUrl,
        ':cover_note'       => $coverNote,
    ]);

    $applicationId = $pdo->lastInsertId();

    sendResponse(true, 'Your job application has been submitted successfully!', [
        'application_id' => $applicationId
    ], 201);

} catch (PDOException $e) {
    sendResponse(false, 'Database insert error: ' . $e->getMessage(), [], 500);
}
