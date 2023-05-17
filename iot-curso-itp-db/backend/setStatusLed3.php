<?php
include "connect.php";

try {
	$conn = new PDO("mysql:host=$serverName;dbname=$dataBase", $userName, $password);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$stmt = $conn->prepare("INSERT INTO statusLed3 (status) VALUES (:status)");

	if (isset($_GET["status"])) {
		$status = $_GET["status"];

		$stmt->bindParam(':status', $status);
		$stmt->execute();

		echo "New record-> Status Led3: " . $status;
	}
} catch (PDOException $e) {
	echo "Connection failed: " . $e->getMessage();
}

$conn = null;
