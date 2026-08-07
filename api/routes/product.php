<?php

require_once __DIR__ . "/../controller/ProductController.php";
$request = trim($_SERVER["PATH_INFO"] ?? "", "/");
$productController = new ProductController($conn);




switch ($request) {
    case 'products':
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $productController->create();
        } 
        else {
            jsonResponse(false, "Method Not Allowed", null, 405);
        }
        break;


        case 'allProducts':
        if ($_SERVER["REQUEST_METHOD"] === "GET") {
            $productController->getAllProducts();
        } else {
            jsonResponse(false, "Method Not Allowed", null, 405);
        }
        break;

    
}









