<?php

require_once __DIR__ . "/../controller/AuthController.php";
$request = trim($_SERVER["PATH_INFO"] ?? "", "/");
$authController = new AuthController($conn);

switch ($request) {
    case "register":
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $authController->register();
        } else {
            jsonResponse(false, "Method Not Allowed", null, 405);
        }
        break;

    case "login":
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $authController->login();
        } else {
            jsonResponse(false, "Method Not Allowed", null, 405);
        }
        break;
}