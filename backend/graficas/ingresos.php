<?php
    include('../db_connection.php');
    header('Access-Control-Allow-Origin: *');

    $query = "SELECT CAST(fecha_recibido AS DATE) AS fecha_recibido, SUM(cantidad) AS cantidad FROM ingreso GROUP BY CAST(fecha_recibido AS DATE);";
    $res = array();

    if($conn){
        $result = mysqli_query($conn, $query);
        $acc = [];

        while($row = mysqli_fetch_array($result)){
            $acc[$row['fecha_recibido']] = $row['cantidad'];
        }

        echo json_encode($acc);
    }
?>