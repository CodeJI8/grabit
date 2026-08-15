<?php

function uploadProductImage($file)
{
    $uploadDir = __DIR__ . "/../uploads/products/";

    if (!isset($file) || $file["error"] !== UPLOAD_ERR_OK) {
        return false;
    }

    $allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!in_array($file["type"], $allowedTypes)) {
        return false;
    }

    if ($file["size"] > 5 * 1024 * 1024) {
        return false;
    }

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $extension = pathinfo($file["name"], PATHINFO_EXTENSION);

    $fileName = uniqid("product_", true) . "." . $extension;

    $filePath = $uploadDir . $fileName;

    if (!move_uploaded_file($file["tmp_name"], $filePath)) {
        return false;
    }

    return "uploads/products/" . $fileName;
}