<?php
    include('../db_connection.php');

    header('Access-Control-Allow-Origin: *');

    $query = "SELECT idmedicamento, medicamento.nombre AS nombre, marca, fecha_ingreso, clasificacion.nombre AS clasificacion FROM medicamento INNER JOIN clasificacion ON medicamento.clasificacion = clasificacion.idclasificacion ORDER BY nombre;";
    $res = array();

    if($conn){
        $result = mysqli_query($conn, $query);
        if($result){
            header('Content-Type: JSON');
            $i = 0;
            while($row = mysqli_fetch_assoc($result)){
                $res[$i]['id'] = $row['idmedicamento'];
                $res[$i]['nombre'] = $row['nombre'];
                $res[$i]['marca'] = $row['marca'];
                $res[$i]['fecha_ingreso'] = $row['fecha_ingreso'];
                $res[$i]['clasificacion'] = $row['clasificacion'];
                $i++;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        }
    } else{
        echo "ERROR";
    }
?>