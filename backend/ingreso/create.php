<?php
    include('../db_connection.php');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    $query1 = "INSERT INTO factura (numero_factura, numero_control, fecha_factura, fecha_vencimiento) VALUES " .
    "('" . $data['numero_factura'] . "', '" . $data['numero_control'] . "', '" . $data['fecha_factura'] . "', '" . $data['fecha_vencimiento_factura'] . "');";
    
    if($conn->query($query1) === FALSE){
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    } else{
        $factura_id = mysqli_insert_id($conn);
    }

    $query2 = "INSERT INTO lote (codigo_lote, fecha_vencimiento, medicamento) VALUES " .
    "('" . $data['codigo_lote'] . "', '" . $data['fecha_vencimiento_lote'] . "', '" . $data['medicamento'] . "');";

    if($conn->query($query2) === FALSE){
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    } else{
        $lote_id = mysqli_insert_id($conn);
    }

    $query3 = "INSERT INTO ingreso (cantidad, fecha_recibido, usuario, proveedor, factura, lote) " .
    "VALUES ('" . $data['cantidad'] . "', '" . $data['fecha_recibido'] . "', '" . $data['usuario'] .
    "', '" . $data['proveedor'] . "', '" . $factura_id . "', '" . $lote_id . "');";

    $res = array();

    if($conn->query($query3) === TRUE){
            $res['status'] = 200;
            echo json_encode($res, JSON_PRETTY_PRINT);
    } else{
        $res['status'] = 400;
        echo json_encode($res, JSON_PRETTY_PRINT);
    }
?>