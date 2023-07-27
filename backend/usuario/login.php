<?php
    include('../db_connection.php');

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    $query = "SELECT * FROM usuario WHERE tipo='" . $data['tipo'] . "' AND cedula='" . $data['cedula'] . "';";
    $res = array();

    if($conn){
        $result = mysqli_query($conn, $query);
        if($result){
            header('Content-Type: JSON');
            $i = 0;
            while($row = mysqli_fetch_assoc($result)){
                $res[$i]['id'] = $row['idusuario'];
                $res[$i]['nombre'] = $row['nombre'];
                $res[$i]['tipo'] = $row['tipo'];
                $res[$i]['cedula'] = $row['cedula'];
                if(md5($data['contrasena']) == $row['contrasena']){
                    $res[$i]['estado'] = 200;  
                } else {
                    $res[$i]['estado'] = 400;
                }
                $i++;
            }
            echo json_encode($res, JSON_PRETTY_PRINT);
        }
    } else{
        echo "ERROR";
    }
?>