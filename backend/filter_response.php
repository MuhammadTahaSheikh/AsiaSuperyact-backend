<?php
// Simple script to filter deprecation warnings from responses
$url = 'http://127.0.0.1:8000' . $_SERVER['REQUEST_URI'];

$context = stream_context_create([
    'http' => [
        'method' => $_SERVER['REQUEST_METHOD'],
        'header' => getallheaders(),
        'content' => file_get_contents('php://input')
    ]
]);

$response = file_get_contents($url, false, $context);

// Remove deprecation warnings
$response = preg_replace('/<br\s*\/?>\s*<b>Deprecated<\/b>.*?<\/b><br\s*\/?>/s', '', $response);
$response = preg_replace('/<br\s*\/?>\s*<b>Warning<\/b>.*?<\/b><br\s*\/?>/s', '', $response);

echo $response;
?>
