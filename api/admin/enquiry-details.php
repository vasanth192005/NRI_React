<?php

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    apiResponse(405, ['ok' => false]);
}

requireAdmin();

$id = (int)($_GET['id'] ?? 0);

if ($id <= 0) {
    apiResponse(400, ['ok' => false]);
}

$stmt = $pdo->prepare(
    "SELECT * FROM nri_enquiries WHERE id = ? LIMIT 1"
);

$stmt->execute([$id]);

$enquiry = $stmt->fetch();

if (!$enquiry) {
    apiResponse(404, [
        'ok' => false,
        'message' => 'Enquiry not found'
    ]);
}

apiResponse(200, [
    'ok' => true,
    'data' => $enquiry
]);