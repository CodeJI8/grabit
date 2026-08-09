<?php

require_once __DIR__ . "/../models/Product.php";
require_once __DIR__ . "/../helper/response.php";
require_once __DIR__ . "/../helper/validator.php";

class ProductController
{
    private $product;

    public function __construct($db)
    {
        $this->product = new Product($db);
    }

    public function create()
    {

    $data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    jsonResponse(false, "Invalid request data.", null, 400);
}
       $ownerId = $data["owner_id"] ?? "";
$title = trim($data["title"] ?? "");
$description = trim($data["description"] ?? "");
$price = $data["price"] ?? "";
$image = $data["image"] ?? "";

        if (isEmpty($ownerId, $title, $price)) {
            jsonResponse(false, "Required fields are missing", null, 400);
        }

        $created = $this->product->createProduct(
            $ownerId,
            $title,
            $description,
            $price,
            $image
        );

        if ($created) {
            jsonResponse(true, "Product listed successfully");
        }

        jsonResponse(false, "Failed to list product", null, 500);
    }



   public function getAllProducts()
{
    $products = $this->product->getAll();

    if ($products) {
        jsonResponse(true, "Products retrieved successfully", $products);
    }

    jsonResponse(false, "No products found", [], 404);
}
}