
<?php

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$isHttps = !empty($_SERVER['HTTPS']) &&
           $_SERVER['HTTPS'] !== 'off';

if (session_status() !== PHP_SESSION_ACTIVE) {

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);

    session_start();
}

function apiResponse($code, $data) {

    http_response_code($code);

    echo json_encode($data);

    exit;
}

function requireAdmin() {

    if (empty($_SESSION['admin_id'])) {
        apiResponse(401, [
            'ok' => false,
            'message' => 'Unauthorized'
        ]);
    }
}

function requireCsrf() {

    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';

    if (
        empty($_SESSION['admin_csrf']) ||
        !hash_equals($_SESSION['admin_csrf'], $token)
    ) {
        apiResponse(403, [
            'ok' => false,
            'message' => 'Invalid security token'
        ]);
    }
}

function getJsonInput() {

    $data = json_decode(
        file_get_contents('php://input'),
        true
    );

    if (!is_array($data)) {
        apiResponse(400, [
            'ok' => false,
            'message' => 'Invalid JSON'
        ]);
    }

    return $data;
}

function generateCsrf() {

    $_SESSION['admin_csrf'] = bin2hex(random_bytes(32));

    return $_SESSION['admin_csrf'];
}
