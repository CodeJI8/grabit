<?php

class BaseModel
{
    protected $conn;
    protected $table;

    public function __construct($db)
    {
        $this->conn = $db;
    }
}