<?php
    include('../db_connection.php');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    $query1 = "UPDATE `ingreso` SET `cantidad` = '" . $data['cantidad'] . "', `fecha_recibido` = '" . $data['fecha_recibido']
    . "', `proveedor` = '" . $data['proveedor'] . "' WHERE `ingreso`.`idingreso` =" . $data['id'] . ";";
    $res = array();

    if($conn->query($query1) === FALSE){
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    }

    $query2 = "UPDATE `factura` SET `numero_factura` = '" . $data['numero_factura'] . "', `numero_control` = '" . $data['numero_control']
    . "', `fecha_factura` = '" . $data['fecha_factura']
    . "', `fecha_vencimiento` = '" . $data['fecha_vencimiento_factura'] . "' WHERE `factura`.`idfactura` =" . $data['factura'] . ";";

    if($conn->query($query2) === FALSE){
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    }

    $query3 = "UPDATE `lote` SET `codigo_lote` = '" . $data['codigo_lote'] . "', `fecha_vencimiento` = '" . $data['fecha_vencimiento_lote']
    . "' WHERE `lote`.`idlote` =" . $data['lote'] . ";";

    if($conn->query($query3) === TRUE){
            $res['status'] = 200;
            echo json_encode($res, JSON_PRETTY_PRINT);
    } else{
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    }
?>