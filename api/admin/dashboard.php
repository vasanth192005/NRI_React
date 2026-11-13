<?php

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    apiResponse(405, ['ok' => false]);
}

requireAdmin();

$total = $pdo->query(
    "SELECT COUNT(*) FROM nri_enquiries"
)->fetchColumn();

$new = $pdo->query(
    "SELECT COUNT(*) FROM nri_enquiries WHERE status = 'New'"
)->fetchColumn();

$contacted = $pdo->query(
    "SELECT COUNT(*) FROM nri_enquiries WHERE status = 'Contacted'"
)->fetchColumn();

$progress = $pdo->query(
    "SELECT COUNT(*) FROM nri_enquiries WHERE status = 'In Progress'"
)->fetchColumn();

$closed = $pdo->query(
    "SELECT COUNT(*) FROM nri_enquiries WHERE status = 'Closed'"
)->fetchColumn();

$recent = $pdo->query(
    "SELECT id, name, email, service, status, created_at
     FROM nri_enquiries
     ORDER BY created_at DESC, id DESC
     LIMIT 5"
)->fetchAll();

apiResponse(200, [
    'ok' => true,
    'stats' => [
        'total' => (int)$total,
        'new' => (int)$new,
        'contacted' => (int)$contacted,
        'progress' => (int)$progress,
        'closed' => (int)$closed
    ],
    'recent' => $recent
]);