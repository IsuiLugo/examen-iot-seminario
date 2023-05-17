<?php

class conexion
{
    private $servername;
    private $username;
    private $password;
    private $db;
    private $conn;
    private $hour;
    private $error;

    function __construct()
    {
        $this->serverName = "examen-seminario-iot-aldo-isui.c3li2z2ujzkc.us-east-1.rds.amazonaws.com";
        $this->username = "exameniot";
        $this->password = "examen1234";
        $this->db = "examen-seminario-iot-aldo-isui";
    }

    function conn()
    {
        try 
        {
            $this->conn = new PDO("mysql:host=$this->servername;dbname=$this->db", $this->username, $this->password);
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->error = false;
        } 
        catch (PDOException $e) 
        {
            echo "Connection failed: " . $e->getMessage();
            $this->error = true;
        }
    }

    function getStatus()
    {
        if (!$this->error) 
        {
            $sql = "SELECT * FROM hourstatus ORDER BY date DESC LIMIT 1";
            $query = $this->conn->prepare($sql);
            $query->execute();
            $results = $query->fetchAll(PDO::FETCH_OBJ);

            if (count($results))
                echo $results[0]->hour;
            else
                echo "No hay registros...";
        } else {
            echo "Error en la conexión";
        }
        $this->conn = null;
    }

    function setStatus()
    {
        if (
            $this->valida_hour() != -1 &&
            !$this->error
        ) 
        {
            $sql = "INSERT INTO hourstatus (hour) VALUES ($this->hour)";
            $this->conn->exec($sql);

            echo "Hora actual: $this->hour";
        } 
        else 
        {
            if ($this->valida_hour() == -1)
                echo "Error: Valor de hora inválido";
            if ($this->error)
                echo "Error en la conexión";
        }

        $this->conn = null;
    }

    function valida_hour()
    {
        // Simulate getting the current hour from the internet
        $currentHour = date("H");

        if ($currentHour >= 0 && $currentHour <= 23) {
            $this->hour = $currentHour;
            return $this->hour;
        } else {
            return -1;
        }
    }
}

