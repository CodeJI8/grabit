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
        $ownerId = $_POST["owner_id"] ?? "";
        $title = trim($_POST["title"] ?? "");
        $description = trim($_POST["description"] ?? "");
        $price = $_POST["price"] ?? "";
        $image = $_POST["image"] ?? "";

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
}