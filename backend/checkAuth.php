<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "loggedIn" => true,
        "user_id" => $_SESSION['user_id']
    ]);
} else {
    http_response_code(401);
    echo json_encode(["loggedIn" => false, "error" => "Not logged in"]);
}
