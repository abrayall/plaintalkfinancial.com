<?php
/**
 * Calendly API Proxy
 * Handles available times lookup and event booking
 */

require_once __DIR__ . '/calendly-config.php';

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

    echo json_encode([
        'success' => true,
        'event_uri' => $result['resource']['event'] ?? '',
        'cancel_url' => $result['resource']['cancel_url'] ?? '',
        'reschedule_url' => $result['resource']['reschedule_url'] ?? ''
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
