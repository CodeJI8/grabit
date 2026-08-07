<?php

require_once __DIR__ . "/BaseModel.php";

class Product extends BaseModel{

  protected $table = "products";

  public function createProduct($ownerID , $title , $desc , $price , $image)
      {
        $query = "INSERT INTO {$this->table}
                    (owner_id, title, description, price, image)
                  VALUES
                    (:owner_id, :title, :description, :price, :image)";

        $stmt = $this->conn->prepare($query);

        return $stmt->execute([
            ":owner_id"   => $ownerID,
            ":title"      => $title,
            ":description"=> $desc,
            ":price"      => $price,            
            ":image"      => $image
        ]);
    }



    public function getAll()
{
    $query = "SELECT * FROM {$this->table}";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

    



}