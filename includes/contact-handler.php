<?php
chdir($_SERVER['DOCUMENT_ROOT']);
require_once('lightspeed/mail.php');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot check
if (!empty($_POST['Address'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name      = trim($_POST['Name'] ?? $_POST['FirstName'] ?? '');
$lastName  = trim($_POST['LastName'] ?? '');
$email     = trim($_POST['Email'] ?? '');
$phone     = trim($_POST['Phone'] ?? '');
$message   = trim($_POST['Message'] ?? '');
$subject   = trim($_POST['MessageSubject'] ?? 'Website Contact Form');
$sourceUrl = trim($_POST['SourceUrl'] ?? '');
$prefDate  = trim($_POST['PreferredDate'] ?? '');
$prefTime  = trim($_POST['PreferredTime'] ?? '');

if ($lastName) {
    $name = $name . ' ' . $lastName;
}

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Name and email are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
    exit;
}

$name    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email   = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone   = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$body = "<h2>{$subject}</h2>";
$body .= "<p><strong>Name:</strong> {$name}</p>";
$body .= "<p><strong>Email:</strong> {$email}</p>";
if ($phone) {
    $body .= "<p><strong>Phone:</strong> {$phone}</p>";
}
if ($prefDate) {
    $body .= "<p><strong>Preferred Date:</strong> " . htmlspecialchars($prefDate, ENT_QUOTES, 'UTF-8') . "</p>";
}
if ($prefTime) {
    $body .= "<p><strong>Preferred Time:</strong> " . htmlspecialchars($prefTime, ENT_QUOTES, 'UTF-8') . "</p>";
}
if ($message) {
    $body .= "<p><strong>Message:</strong><br>" . nl2br($message) . "</p>";
}
if ($sourceUrl) {
    $body .= "<hr><p style='color:#999;font-size:12px;'>Submitted from: " . htmlspecialchars($sourceUrl, ENT_QUOTES, 'UTF-8') . "</p>";
}

$mail = mailer()
    ->to('bob@plaintalkfinancial.com', 'Bob Foster')
    ->replyTo($email, $name)
    ->subject($subject . ' - ' . $name)
    ->html($body, strip_tags(str_replace('<br>', "\n", $body)));

if ($mail->send()) {
    // Send confirmation email to the person who submitted the form
    $firstName = explode(' ', $name)[0];
    $confirmBody = "<p>Dear {$firstName},</p>";
    $confirmBody .= "<p>Thank you for your interest in Plain Talk Financial Planning and for taking the time to inquire about how we can serve you. A member of our team will contact you shortly.</p>";
    $confirmBody .= "<p>Kind Regards,</p>";
    $confirmBody .= "<p>Bob Foster<br>Principal Advisor<br>Plain Talk Financial Planning, LLC</p>";

    mailer()
        ->to($email, $name)
        ->subject('Thank you for contacting Plain Talk Financial Planning')
        ->html($confirmBody, strip_tags(str_replace(['<br>', '</p>'], ["\n", "\n\n"], $confirmBody)))
        ->send();

    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send message. Please try again later.']);
}
