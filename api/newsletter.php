<?php
// POST /api/newsletter.php  - Subscribe to newsletter
// POST /api/wholesale.php   - Submit wholesale inquiry

require_once 'config.php';

$route = basename($_SERVER['PHP_SELF'], '.php'); // 'newsletter' or 'wholesale'

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true) ?? [];

$db = getDB();

if ($route === 'newsletter') {
    $email = filter_var(trim($body['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    if (!$email) {
        http_response_code(422);
        echo json_encode(['success' => false, 'error' => 'Invalid email']);
        exit;
    }

    try {
        $db->prepare("INSERT IGNORE INTO newsletter_subscribers (email) VALUES (:email)")
           ->execute([':email' => $email]);
        echo json_encode(['success' => true, 'message' => 'Subscribed successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Could not subscribe']);
    }

} elseif ($route === 'wholesale') {
    $required = ['email', 'contact_name', 'company_name'];
    foreach ($required as $f) {
        if (empty($body[$f])) {
            http_response_code(422);
            echo json_encode(['success' => false, 'error' => "Missing: $f"]);
            exit;
        }
    }

    if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'error' => 'Invalid email']);
        exit;
    }

    try {
        $db->prepare("
            INSERT INTO wholesale_inquiries
                (contact_name, company_name, email, phone, business_type, quantity_est, message)
            VALUES
                (:contact_name, :company_name, :email, :phone, :business_type, :quantity_est, :message)
        ")->execute([
            ':contact_name'  => $body['contact_name'],
            ':company_name'  => $body['company_name'],
            ':email'         => $body['email'],
            ':phone'         => $body['phone']         ?? '',
            ':business_type' => $body['business_type'] ?? '',
            ':quantity_est'  => $body['quantity_est']  ?? '',
            ':message'       => $body['message']       ?? '',
        ]);
        echo json_encode(['success' => true, 'message' => 'Inquiry received']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Could not submit inquiry']);
    }
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'Unknown route']);
}


