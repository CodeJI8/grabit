<?php

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

    default:
        jsonResponse(false, "Route not found.", null, 404);
        break;
}