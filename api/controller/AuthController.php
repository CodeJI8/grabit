<?php

require_once __DIR__ . "/../models/User.php";
require_once __DIR__ . "/../helper/response.php";
require_once __DIR__ . "/../helper/validator.php";

class AuthController
{
    private $user;

    public function __construct($db)
    {
        $this->user = new User($db);
    }

    public function register()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data) {
              jsonResponse(false, "Invalid request data.", null, 400);
        }

        $name = $data["name"] ?? "";
        $phone = $data["phone"] ?? "";
        $roleId = $data["role_id"] ?? "";
        $role = $data["role"] ?? "";
        $password = $data["password"] ?? "";

  if (isEmpty($name, $phone, $roleId, $role, $password)) {
    jsonResponse(false, "All fields are required.", null, 400);
}

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $created = $this->user->createUser(
            $name,
            $phone,
            $roleId,
            $role,
            $hashedPassword
        );

        if ($created) {
            jsonResponse(true, "User registered successfully.");
        }

        jsonResponse(false, "Registration failed.");
    }




public function login(){

    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
    jsonResponse(false, "Invalid request data.", null, 400);
}

    $phone = $data["phone"] ?? "";
    $password = $data["password"] ?? "";
    $user = $this->user->loginUser($phone);

    if (!$user) {
    jsonResponse(false, "User not found.", null, 404);
}

        if (!password_verify($password, $user["password"])) {
    jsonResponse(false, "Invalid password.", null, 401);
}

    unset($user["password"]);

    jsonResponse(true, "Login successful.", $user);

}





}