<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/config/database.php";
require_once __DIR__ . "/helper/response.php";

$request = $_SERVER["REQUEST_URI"];
$path = parse_url($request, PHP_URL_PATH);

$path = str_replace("/grabit/api/index.php", "", $path);


switch ($path) {

    case "/register":
        require_once __DIR__ . "/routes/auth.php";
        break;


            case "/login":
        require_once __DIR__ . "/routes/auth.php";
        break;

            case "/products":
        require_once __DIR__ . "/routes/product.php";
        break;


            case "/allProducts":
        require_once __DIR__ . "/routes/product.php";
        break;

    default:
        jsonResponse(false, "Route not found.", null, 404);
        break;
}