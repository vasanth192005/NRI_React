
<?php
session_start();

require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function out($code, $ok, $status) {
    http_response_code($code);
    echo json_encode([
        'ok' => $ok,
        'status' => $status
    ]);
    exit;
}

// Only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    out(405, false, 'error');
}

// Same-site validation
$src = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$host = strtolower(parse_url($src, PHP_URL_HOST) ?? '');

$allowed = array_map(
    fn($h) => strtolower(trim($h)),
    explode(',', NRI_ALLOWED_HOSTS)
);

if (
    $host &&
    !in_array($host, $allowed, true) &&
    !in_array($host, ['localhost', '127.0.0.1'], true)
) {
    out(403, false, 'error');
}

// Read JSON request
$in = json_decode(file_get_contents('php://input'), true);

if (!is_array($in)) {
    out(400, false, 'error');
}

// Honeypot
if (!empty($in['website'])) {
    out(200, true, 'sent');
}

// Clean input
function clean($in, $key) {
    return trim(
        preg_replace(
            '/[\r\n]+/',
            ' ',
            strip_tags((string)($in[$key] ?? ''))
        )
    );
}

$name    = clean($in, 'name');
$phone   = clean($in, 'phone');
$country = clean($in, 'country');
$city    = clean($in, 'city');
$service = clean($in, 'service');

$email = filter_var(
    trim((string)($in['email'] ?? '')),
    FILTER_VALIDATE_EMAIL
);

$desc = trim(
    strip_tags((string)($in['description'] ?? ''))
);

// Validation
if (!$name || !$email || !$phone || !$country || !$desc) {
    out(422, false, 'invalid');
}

// Rate limit: 30 seconds
if (
    !empty($_SESSION['last']) &&
    time() - $_SESSION['last'] < 30
) {
    out(429, false, 'error');
}

try {

    // 1. Insert enquiry into database
    $sql = "INSERT INTO nri_enquiries
            (name, email, phone, country, city, service, description)
            VALUES
            (:name, :email, :phone, :country, :city, :service, :description)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':name'        => $name,
        ':email'       => $email,
        ':phone'       => $phone,
        ':country'     => $country,
        ':city'        => $city,
        ':service'     => $service,
        ':description' => $desc
    ]);

    // Get inserted enquiry ID
    $enquiryId = $pdo->lastInsertId();

    // 2. Send email notification
    $body = "New NRI Enquiry\n\n";
    $body .= "Enquiry ID: $enquiryId\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Country: $country\n";
    $body .= "City: $city\n";
    $body .= "Service: $service\n\n";
    $body .= "Requirement:\n$desc\n";

    $headers = 'From: ' . NRI_SITE_NAME .
        ' <' . NRI_FROM . ">\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8";

    $subject = '=?UTF-8?B?' .
        base64_encode("New NRI enquiry: $service") .
        '?=';

    $mailSent = mail(
        NRI_EMAIL,
        $subject,
        $body,
        $headers
    );

    if (!$mailSent) {
        error_log("Email failed for enquiry ID: $enquiryId");
    }

    // 3. Update rate limit after successful DB insert
    $_SESSION['last'] = time();

    // 4. Return success to React
    out(200, true, 'sent');

} catch (PDOException $e) {

    error_log('Contact enquiry DB error: ' . $e->getMessage());

    out(500, false, 'error');

}
