<?php
/**
 * Calendly API Proxy
 * Handles available times lookup and event booking
 */

require_once __DIR__ . '/calendly-config.php';

chdir($_SERVER['DOCUMENT_ROOT']);
require_once 'lightspeed/mail.php';

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';

switch ($action) {
    case 'get_event_type':
        handleGetEventType();
        break;
    case 'get_available_times':
        handleGetAvailableTimes($input);
        break;
    case 'book':
        handleBook($input);
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

/**
 * Get the event type URI (auto-detect if not configured)
 */
function handleGetEventType() {
    $eventType = CALENDLY_EVENT_TYPE;

    if (empty($eventType) || $eventType === '') {
        // Auto-detect from user URI
        $userUri = defined('CALENDLY_USER_URI') ? CALENDLY_USER_URI : '';
        if (empty($userUri)) {
            http_response_code(500);
            echo json_encode(['error' => 'Calendly event type not configured.']);
            return;
        }

        $eventTypes = calendlyRequest('GET', '/event_types?' . http_build_query([
            'user' => $userUri,
            'active' => 'true',
            'count' => 1
        ]));

        if (!$eventTypes || empty($eventTypes['collection'])) {
            http_response_code(500);
            echo json_encode(['error' => 'No active event types found in your Calendly account.']);
            return;
        }

        $eventType = $eventTypes['collection'][0]['uri'];
    }

    // Get event type details
    $parts = explode('/event_types/', $eventType);
    $details = calendlyRequest('GET', '/event_types/' . end($parts));

    echo json_encode([
        'event_type' => $eventType,
        'name' => $details['resource']['name'] ?? '',
        'duration' => $details['resource']['duration'] ?? 30,
        'custom_question' => $details['resource']['custom_questions'][0]['name'] ?? ''
    ]);
}

/**
 * Get available time slots for a date range
 */
function handleGetAvailableTimes($input) {
    $eventType = $input['event_type'] ?? '';
    $startTime = $input['start_time'] ?? '';
    $endTime = $input['end_time'] ?? '';

    if (empty($eventType) || empty($startTime) || empty($endTime)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: event_type, start_time, end_time']);
        return;
    }

    // Calendly rejects start_time in the past — clamp to now+2min if needed
    $startDt = new \DateTime($startTime);
    $now = new \DateTime('now', new \DateTimeZone('UTC'));
    $now->modify('+2 minutes');
    if ($startDt < $now) {
        $startTime = $now->format('Y-m-d\TH:i:s\Z');
    }

    $result = calendlyRequest('GET', '/event_type_available_times?' . http_build_query([
        'event_type' => $eventType,
        'start_time' => $startTime,
        'end_time' => $endTime
    ]));

    if (!$result) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch available times']);
        return;
    }

    echo json_encode(['times' => $result['collection'] ?? []]);
}

/**
 * Book an appointment
 */
function handleBook($input) {
    $eventType = $input['event_type'] ?? '';
    $startTime = $input['start_time'] ?? '';
    $firstName = trim($input['first_name'] ?? '');
    $lastName = trim($input['last_name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $message = trim($input['message'] ?? '');
    $timezone = $input['timezone'] ?? 'America/New_York';

    if (empty($eventType) || empty($startTime) || empty($email) || empty($firstName)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }

    $body = [
        'event_type' => $eventType,
        'start_time' => $startTime,
        'location' => ['kind' => 'zoom_conference'],
        'invitee' => [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'timezone' => $timezone
        ],
        'booking_source' => 'plaintalk_website'
    ];

    if (!empty($phone)) {
        // Format phone to E.164 (strip non-digits, prepend +1 if needed)
        $digits = preg_replace('/\D/', '', $phone);
        if (strlen($digits) === 10) {
            $digits = '1' . $digits;
        }
        if (strlen($digits) >= 11) {
            $body['invitee']['text_reminder_number'] = '+' . $digits;
        }
    }

    if (!empty($message)) {
        $body['questions_and_answers'] = [
            [
                'question' => 'Please share anything that will help prepare for our meeting.',
                'answer' => $message,
                'position' => 0
            ]
        ];
    }

    $result = calendlyRequest('POST', '/invitees', $body);

    if (!$result || isset($result['title']) || isset($result['error'])) {
        $errorMsg = $result['message'] ?? $result['error'] ?? $result['title'] ?? 'Failed to book appointment';
        http_response_code(500);
        echo json_encode(['error' => $errorMsg]);
        return;
    }

    // Send confirmation email with ICS calendar invite
    $cancelUrl = $result['resource']['cancel_url'] ?? '';
    $rescheduleUrl = $result['resource']['reschedule_url'] ?? '';
    $duration = intval($input['duration'] ?? 30);

    $startDt = new \DateTime($startTime, new \DateTimeZone('UTC'));
    $endDt = clone $startDt;
    $endDt->modify("+{$duration} minutes");

    $localDt = clone $startDt;
    $localDt->setTimezone(new \DateTimeZone($timezone));

    $formattedDate = $localDt->format('l, F j, Y');
    $formattedTime = $localDt->format('g:i A T');

    // Generate ICS calendar invite
    $uid = uniqid('plaintalk-', true) . '@plaintalkfinancial.com';
    $dtStamp = gmdate('Ymd\THis\Z');
    $dtStart = $startDt->format('Ymd\THis\Z');
    $dtEnd = $endDt->format('Ymd\THis\Z');
    $fullName = trim($firstName . ' ' . $lastName);

    $icsContent = "BEGIN:VCALENDAR\r\n";
    $icsContent .= "VERSION:2.0\r\n";
    $icsContent .= "PRODID:-//Plain Talk Financial Planning//Appointment//EN\r\n";
    $icsContent .= "METHOD:REQUEST\r\n";
    $icsContent .= "BEGIN:VEVENT\r\n";
    $icsContent .= "UID:{$uid}\r\n";
    $icsContent .= "DTSTAMP:{$dtStamp}\r\n";
    $icsContent .= "DTSTART:{$dtStart}\r\n";
    $icsContent .= "DTEND:{$dtEnd}\r\n";
    $icsContent .= "SUMMARY:Plain Talk Financial Planning - Introductory Meeting\r\n";
    $icsContent .= "DESCRIPTION:Introductory meeting with Plain Talk Financial Planning. Duration: {$duration} minutes. Format: Video call (Zoom).\r\n";
    $icsContent .= "ORGANIZER;CN=Bob Foster:mailto:bob@plaintalkfinancial.com\r\n";
    $icsContent .= "ATTENDEE;CN={$fullName};RSVP=TRUE:mailto:{$email}\r\n";
    $icsContent .= "LOCATION:Zoom Video Call\r\n";
    $icsContent .= "STATUS:CONFIRMED\r\n";
    $icsContent .= "END:VEVENT\r\n";
    $icsContent .= "END:VCALENDAR\r\n";

    $tmpFile = tempnam(sys_get_temp_dir(), 'cal') . '.ics';
    file_put_contents($tmpFile, $icsContent);

    // Build confirmation email body
    $emailBody = "<p>Dear {$firstName},</p>";
    $emailBody .= "<p>Thank you for scheduling an appointment with Plain Talk Financial Planning.</p>";
    $emailBody .= "<p><strong>Appointment Details:</strong><br>";
    $emailBody .= "Date: {$formattedDate}<br>";
    $emailBody .= "Time: {$formattedTime}<br>";
    $emailBody .= "Duration: {$duration} minutes<br>";
    $emailBody .= "Format: Video call (Zoom)</p>";
    $emailBody .= "<p>A calendar invite is attached for your convenience.";
    if ($rescheduleUrl || $cancelUrl) {
        $emailBody .= " If you need to reschedule or cancel, you can do so using the links below:</p>";
        if ($rescheduleUrl) {
            $emailBody .= "<p>Reschedule: <a href=\"{$rescheduleUrl}\">{$rescheduleUrl}</a></p>";
        }
        if ($cancelUrl) {
            $emailBody .= "<p>Cancel: <a href=\"{$cancelUrl}\">{$cancelUrl}</a></p>";
        }
    } else {
        $emailBody .= "</p>";
    }
    $emailBody .= "<p>We look forward to speaking with you.</p>";
    $emailBody .= "<p>Kind Regards,</p>";
    $emailBody .= "<p>Bob Foster<br>Principal Advisor<br>Plain Talk Financial Planning, LLC</p>";

    $plainText = strip_tags(str_replace(['<br>', '</p>'], ["\n", "\n\n"], $emailBody));

    mailer()
        ->to($email, $fullName)
        ->subject('Your Appointment with Plain Talk Financial Planning')
        ->html($emailBody, $plainText)
        ->attach($tmpFile, 'appointment.ics')
        ->send();

    unlink($tmpFile);

    echo json_encode([
        'success' => true,
        'event_uri' => $result['resource']['event'] ?? '',
        'cancel_url' => $cancelUrl,
        'reschedule_url' => $rescheduleUrl
    ]);
}

/**
 * Make a request to the Calendly API
 */
function calendlyRequest($method, $endpoint, $body = null) {
    $url = CALENDLY_API_BASE . $endpoint;

    // If endpoint already starts with http, it's a full URL in a query param - use as-is
    if (strpos($endpoint, '?') !== false) {
        $url = CALENDLY_API_BASE . $endpoint;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . CALENDLY_API_TOKEN,
        'Content-Type: application/json',
        'Accept: application/json'
    ]);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false) {
        return null;
    }

    return json_decode($response, true);
}
