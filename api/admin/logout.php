<?php

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    apiResponse(405, ['ok' => false]);
}

requireAdmin();
requireCsrf();

$_SESSION = [];

if (ini_get('session.use_cookies')) {

    $params = session_get_cookie_params();

    setcookie(
        session_name(),
        '',
        [
            'expires' => time() - 3600,
            'path' => $params['path'],
            'secure' => $params['secure'],
            'httponly' => true,
            'samesite' => 'Lax'
        ]
    );
}

session_destroy();

apiResponse(200, [
    'ok' => true,
    'message' => 'Logged out'
]);