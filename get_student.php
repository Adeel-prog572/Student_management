<?php

header("Content-Type: application/json");

require_once "db.php";

$sql = "SELECT id, name, rollNO, className, email FROM students ORDER BY id DESC";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
    exit;
}

$students = [];

while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode([
    "success" => true,
    "students" => $students
]);

$conn->close();

?>