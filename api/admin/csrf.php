<?php

ini_set('log_errors', '1');
ini_set('display_errors', '0');
error_reporting(E_ALL);

ini_set('error_log', __DIR__ . '/csrf-error.log');

register_shutdown_function(function () {
    $error = error_get_last();

    if ($error !== null) {
        error_log(
            'PHP ERROR: ' . $error['message'] .
            ' | File: ' . $error['file'] .
            ' | Line: ' . $error['line']
        );
    }
});

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    apiResponse(405, ['ok' => false]);
}

apiResponse(200, [
    'ok' => true,
    'csrfToken' => generateCsrf()
]);