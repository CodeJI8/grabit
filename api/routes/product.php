<?php

require_once __DIR__ . "/../controller/ProductController.php";

$productController = new ProductController($conn);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $productController->create();
} else {
    jsonResponse(false, "Method Not Allowed", null, 405);
}