<?php

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    apiResponse(405, ['ok' => false]);
}

requireAdmin();

$page = max(1, (int)($_GET['page'] ?? 1));
$limit = min(50, max(1, (int)($_GET['limit'] ?? 10)));
$offset = ($page - 1) * $limit;

$search = trim($_GET['search'] ?? '');
$status = trim($_GET['status'] ?? '');

$allowedStatuses = [
    'New',
    'Contacted',
    'In Progress',
    'Closed'
];

$where = [];
$params = [];

if ($search !== '') {

    $where[] = "(name LIKE ? OR email LIKE ? OR phone LIKE ?)";

    $term = '%' . $search . '%';

    $params[] = $term;
    $params[] = $term;
    $params[] = $term;
}

if ($status !== '' && in_array($status, $allowedStatuses, true)) {

    $where[] = "status = ?";
    $params[] = $status;
}

$whereSql = $where
    ? ' WHERE ' . implode(' AND ', $where)
    : '';

$countStmt = $pdo->prepare(
    "SELECT COUNT(*) FROM nri_enquiries $whereSql"
);

$countStmt->execute($params);

$total = (int)$countStmt->fetchColumn();

$sql = "SELECT id, name, email, phone, country, city,
               service, description, status, created_at
        FROM nri_enquiries
        $whereSql
        ORDER BY created_at DESC, id DESC
        LIMIT $limit OFFSET $offset";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

$rows = $stmt->fetchAll();

apiResponse(200, [
    'ok' => true,
    'data' => $rows,
    'pagination' => [
        'page' => $page,
        'limit' => $limit,
        'total' => $total,
        'totalPages' => (int)ceil($total / $limit)
    ]
]);