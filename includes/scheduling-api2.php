<?php
/**
 * Unified Scheduling API Proxy
 *
 * Replaces calendly-api.php with a provider-agnostic endpoint.
 * Delegates to the active SchedulingProvider (Calendly or Cal.com)
 * and sends confirmation emails on successful bookings.
 */
require_once __DIR__ . '/scheduling/scheduling-factory.php';

chdir($_SERVER['DOCUMENT_ROOT']);
require_once('lightspeed/mail.php');

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';

try {
    $provider = createSchedulingProvider();

    switch ($action) {
        case 'get_event_type':
            echo json_encode($provider->getEventType());
            break;

        case 'get_available_times':
            $eventType = $input['event_type'] ?? '';
            $startTime = $input['start_time'] ?? '';
            $endTime = $input['end_time'] ?? '';

            if (empty($eventType) || empty($startTime) || empty($endTime)) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields: event_type, start_time, end_time']);
                break;
            }

            echo json_encode($provider->getAvailableTimes($eventType, $startTime, $endTime));
            break;

        case 'book':
            $result = $provider->book($input);

            // Send confirmation email to the client
            $firstName = trim($input['first_name'] ?? '');
            $lastName = trim($input['last_name'] ?? '');
            $email = trim($input['email'] ?? '');
            $name = trim($firstName . ' ' . $lastName);

            if ($result['success'] && !empty($email)) {
                $confirmBody = "<p>Dear {$firstName},</p>";
                $confirmBody .= "<p>Thank you for your interest in Plain Talk Financial Planning and for taking the time to schedule an appointment. We look forward to speaking with you.</p>";
                $confirmBody .= "<p>Kind Regards,</p>";
                $confirmBody .= "<p>Bob Foster<br>Principal Advisor<br>Plain Talk Financial Planning, LLC</p>";

                mailer()
                    ->to($email, $name)
                    ->subject('Thank you for booking with Plain Talk Financial Planning')
                    ->html($confirmBody, strip_tags(str_replace(['<br>', '</p>'], ["\n", "\n\n"], $confirmBody)))
                    ->send();

                // Send notification to Bob
                $startTime = $input['start_time'] ?? '';
                $phone = trim($input['phone'] ?? '');
                $message = trim($input['message'] ?? '');

                $notifyBody = "<h2>New Appointment Booking</h2>";
                $notifyBody .= "<p><strong>Name:</strong> {$name}</p>";
                $notifyBody .= "<p><strong>Email:</strong> {$email}</p>";
                if ($phone) {
                    $notifyBody .= "<p><strong>Phone:</strong> " . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . "</p>";
                }
                $notifyBody .= "<p><strong>Time:</strong> {$startTime}</p>";
                if ($message) {
                    $notifyBody .= "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</p>";
                }

                mailer()
                    ->to('bob@plaintalkfinancial.com', 'Bob Foster')
                    ->replyTo($email, $name)
                    ->subject('New Appointment Booking - ' . $name)
                    ->html($notifyBody, strip_tags(str_replace('<br>', "\n", $notifyBody)))
                    ->send();
            }

            echo json_encode($result);
            break;

        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action']);
    }
} catch (RuntimeException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
