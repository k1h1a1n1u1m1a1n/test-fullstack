<?php

class DB
{
    private $host = 'localhost';
    private $user = 'id20201263_orlov';
    private $password = '%WxsEynE%sR_A@6~';
    private $db_name = 'id20201263_trees';

    private $link;

    public function __construct()
    {
        $this->connect();
    }

    private function connect()
    {
        $this->link = new mysqli($this->host, $this->user, $this->password, $this->db_name);
        if ($this->link->connect_error) {
            die("Connection failed: " . $this->link->connect_error);
        }
    }

    public function selectAll($table)
    {
        $query = "SELECT * FROM $table";
        $res = $this->link->query($query);
        $rows = [];
        while ($row = $res->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function update($table, $id, $column, $value)
    {
        $value = htmlspecialchars($value);
        $query = "UPDATE $table SET $column = '$value' WHERE id = $id";
        return $this->link->query($query);
    }

    public function delete($table, $id)
    {
        $query = "DELETE FROM $table  WHERE id = $id";
        return $this->link->query($query);
    }

    public function insert($table, $data)
    {
        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });
        $escaped_values = array_map(array($this->link, 'real_escape_string'), array_values($data));
        $values = implode("', '", $escaped_values);

        $query = "INSERT INTO " . $table . " (" . implode(", ", array_keys($data)) . ") VALUES ('$values')";
        $this->link->query($query);
        return $this->link->insert_id;
    }
}