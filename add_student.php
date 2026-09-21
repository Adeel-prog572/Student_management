<?php

header("Content-Type: application/json");

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request"
    ]);
    exit;
}

$name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
$rollNO = isset($_POST["rollNO"]) ? trim($_POST["rollNO"]) : "";
$className = isset($_POST["className"]) ? trim($_POST["className"]) : "";
$email = isset($_POST["email"]) ? trim($_POST["email"]) : "";

if ($name === "" || $rollNO === "" || $className === "" || $email === "") {

    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);

    exit;
}

$stmt = $conn->prepare(
    "INSERT INTO students (name, rollNO, className, email)
     VALUES (?, ?, ?, ?)"
);

if (!$stmt) {

    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . $conn->error
    ]);

    exit;
}

$stmt->bind_param(
    "ssss",
    $name,
    $rollNO,
    $className,
    $email
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Student added successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $stmt->error
    ]);

}

$stmt->close();
$conn->close();

?>