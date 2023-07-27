<?php
    include('../db_connection.php');
    header('Access-Control-Allow-Origin: *');

    $query = "SELECT * FROM factura;";
    $res = array();

    if($conn){
        $result = mysqli_query($conn, $query);
        $acc = [];

        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $acc[$i]['fecha_vencimiento'] = $row['fecha_vencimiento'];
            $acc[$i]['fecha_factura'] = $row['fecha_factura'];
            $i++;
        }

        echo json_encode($acc);
    }
?>