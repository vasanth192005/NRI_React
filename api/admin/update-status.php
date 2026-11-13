<?php

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    apiResponse(405, ['ok' => false]);
}

requireAdmin();
requireCsrf();

$data = getJsonInput();

$id = (int)($data['id'] ?? 0);
$status = $data['status'] ?? '';

$allowed = [
    'New',
    'Contacted',
    'In Progress',
    'Closed'
];

if ($id <= 0 || !in_array($status, $allowed, true)) {
    apiResponse(422, [
        'ok' => false,
        'message' => 'Invalid enquiry or status'
    ]);
}

$stmt = $pdo->prepare(
    "UPDATE nri_enquiries SET status = ? WHERE id = ?"
);

$stmt->execute([$status, $id]);

if ($stmt->rowCount() === 0) {

    $check = $pdo->prepare(
        "SELECT id FROM nri_enquiries WHERE id = ?"
    );

    $check->execute([$id]);

    if (!$check->fetch()) {
        apiResponse(404, [
            'ok' => false,
            'message' => 'Enquiry not found'
        ]);
    }
}

apiResponse(200, [
    'ok' => true,
    'message' => 'Status updated'
]);