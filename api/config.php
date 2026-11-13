<?php
/** EDIT THESE with your real details. */
define('NRI_EMAIL', 'info@nripropertyregistration.com' );      // enquiries are emailed here
define('NRI_FROM', 'no-reply@nripropertyregistration.com' );   // must be an address on your domain
define('NRI_SITE_NAME', 'Bharath NRI Property' );
// Allowed origin(s) for the form (blocks cross-site posts)
define( 'NRI_ALLOWED_HOSTS', 'nripropertyregistration.com,www.nripropertyregistration.com' );

define('DB_HOST', 'localhost');
define('DB_NAME', 'u879104728_NRI_DB');
define('DB_USER', 'u879104728_Nriuser');
define('DB_PASS', 'Nriproperty$#!1');

try {

    $pdo = new PDO(
        'mysql:host=' . DB_HOST .
        ';dbname=' . DB_NAME .
        ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );

} catch (PDOException $e) {

    error_log($e->getMessage());

    http_response_code(500);
    header('Content-Type: application/json');

    echo json_encode([
        'ok' => false,
        'message' => 'Database connection failed'
    ]);

    exit;
}