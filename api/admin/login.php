<?php

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    apiResponse(405, ['ok' => false]);
}

requireCsrf();

$data = getJsonInput();

$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';

if ($username === '' || $password === '') {
    apiResponse(422, [
        'ok' => false,
        'message' => 'Username and password required'
    ]);
}

// Simple per-session login throttling
if (
    !empty($_SESSION['login_attempts']) &&
    $_SESSION['login_attempts'] >= 5 &&
    time() - ($_SESSION['login_attempt_time'] ?? 0) < 300
) {
    apiResponse(429, [
        'ok' => false,
        'message' => 'Too many attempts. Try again later.'
    ]);
}

$stmt = $pdo->prepare(
    "SELECT id, username, password
     FROM admin_users
     WHERE username = ?
     LIMIT 1"
);

$stmt->execute([$username]);

$admin = $stmt->fetch();

if (!$admin || !password_verify($password, $admin['password'])) {

    $_SESSION['login_attempts'] =
        ($_SESSION['login_attempts'] ?? 0) + 1;

    $_SESSION['login_attempt_time'] = time();

    apiResponse(401, [
        'ok' => false,
        'message' => 'Invalid username or password'
    ]);
}

session_regenerate_id(true);

$_SESSION['admin_id'] = $admin['id'];
$_SESSION['admin_username'] = $admin['username'];

$_SESSION['login_attempts'] = 0;

generateCsrf();

apiResponse(200, [
    'ok' => true,
    'message' => 'Login successful',
    'username' => $admin['username'],
    'csrfToken' => $_SESSION['admin_csrf']
]);