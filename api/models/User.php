<?php

class User
{
    private $conn;
    private $table = "users";

    public function __construct($db)
    {
        $this->conn = $db;
    }


public function createUser($name, $phone, $roleId, $role, $password)

{
    $query = "INSERT INTO {$this->table}
              (name, phone, role_id, role, password)
              VALUES
              (:name, :phone, :role_id, :role, :password)";

    $stmt = $this->conn->prepare($query);

    return $stmt->execute([
        ":name" => $name,
        ":phone" => $phone,
        ":role_id" => $roleId,
        ":role" => $role,
        ":password" => $password
    ]);
}



public function loginUser($phone)
{
    $query = "SELECT * FROM {$this->table}
              WHERE phone = :phone
              LIMIT 1";

    $stmt = $this->conn->prepare($query);

    $stmt->execute([
        ":phone" => $phone
    ]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}


}

