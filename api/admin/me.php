<?php

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    apiResponse(405, ['ok' => false]);
}

requireAdmin();

apiResponse(200, [
    'ok' => true,
    'username' => $_SESSION['admin_username'],
    'csrfToken' => $_SESSION['admin_csrf']
]);