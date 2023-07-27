<?php
    include('../db_connection.php');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    $query = "UPDATE `proveedor` SET `nombre` = '" . $data['nombre'] . "' SET `rif` = '" . $data['rif'] . "' WHERE `proveedor`.`idproveedor` =" . $data['id'] . ";";
    $res = array();

    if($conn->query($query) === TRUE){
            $res['status'] = 200;
            echo json_encode($res, JSON_PRETTY_PRINT);
    } else{
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    }
?>