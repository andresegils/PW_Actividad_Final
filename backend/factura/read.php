<?php
    include('../db_connection.php');

    header('Access-Control-Allow-Origin: *');

    $query = "SELECT * FROM factura;";
    $res = array();

    if($conn){
        $result = mysqli_query($conn, $query);
        if($result){
            header('Content-Type: JSON');
            $i = 0;
            while($row = mysqli_fetch_assoc($result)){
                $res[$i]['id'] = $row['idfactura'];
                $res[$i]['numero_factura'] = $row['numero_factura'];
                $res[$i]['numero_control'] = $row['numero_control'];
                $res[$i]['fecha_factura'] = $row['fecha_factura'];
                $res[$i]['fecha_vencimiento'] = $row['fecha_vencimiento'];
                $i++;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        }
    } else{
        echo "ERROR";
    }
?>