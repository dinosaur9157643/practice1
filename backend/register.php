<?php
// -----------------------------
// CORS HEADERS
// -----------------------------
header("Access-Control-Allow-Origin: http://localhost:3000"); // React frontend
header("Access-Control-Allow-Methods: POST, OPTIONS");       // Allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers
header("Access-Control-Allow-Credentials: true");            // Needed if sending cookies
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// -----------------------------
// DATABASE CONNECTION
// -----------------------------
$host = getenv('DB_HOST') ?: 'localhost';
$dbname = getenv('DB_NAME') ?: 'practice';
$username = getenv('DB_USER') ?: 'root';
$password = getenv('DB_PASSWORD') ?: '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// -----------------------------
// READ INPUT
// -----------------------------
$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : null;
$password = isset($input['password']) ? $input['password'] : null;

// -----------------------------
// VALIDATION
// -----------------------------
if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(["error" => "Email and password are required"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email"]);
    exit;
}

// -----------------------------
// REGISTER USER
// -----------------------------
try {
    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(["error" => "Email already registered"]);
        exit;
    }

    // Hash password and insert
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->execute([$email, $hashedPassword]);

    // Success response
    echo json_encode(["success" => true, "message" => "User registered"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Server error"]);
    exit;
}
