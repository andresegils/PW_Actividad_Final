<?php
    include('../db_connection.php');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    $query1 = "DELETE FROM `ingreso` WHERE `ingreso`.`idingreso` = " . $data['id'] . ";";
    $res = array();

    if($conn->query($query1) === FALSE){
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    }

    $query2 = "DELETE FROM `factura` WHERE `factura`.`idfactura` = " . $data['idfactura'] . ";";

    if($conn->query($query2) === FALSE){
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    }

    $query3 = "DELETE FROM `lote` WHERE `lote`.`idlote` = " . $data['idlote'] . ";";

    if($conn->query($query3) === FALSE){
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    } else{
        $res['status'] = 200;
        echo json_encode($res, JSON_PRETTY_PRINT);
    }
?>