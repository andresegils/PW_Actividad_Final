<?php
    include('../db_connection.php');
    header('Access-Control-Allow-Origin: *');

    $query = "SELECT * FROM proveedor;";
    $res = array();

    if($conn){
        $result = mysqli_query($conn, $query);
        if($result){
            header('Content-Type: JSON');
            $i = 0;
            while($row = mysqli_fetch_assoc($result)){
                $res[$i]['id'] = $row['idproveedor'];
                $res[$i]['nombre'] = $row['nombre'];
                $res[$i]['rif'] = $row['rif'];
                $i++;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        }
    } else{
        echo "ERROR";
    }
?>