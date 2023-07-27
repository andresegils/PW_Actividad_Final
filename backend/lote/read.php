<?php
    include('../db_connection.php');

    header('Access-Control-Allow-Origin: *');
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    $query = "SELECT * FROM lote ORDER BY fecha_vencimiento;";
    $res = array();

    if($conn){
        $result = mysqli_query($conn, $query);
        if($result){
            header('Content-Type: JSON');
            $i = 0;
            while($row = mysqli_fetch_assoc($result)){
                $res[$i]['id'] = $row['idlote'];
                $res[$i]['codigo_lote'] = $row['codigo_lote'];
                $res[$i]['fecha_vencimiento'] = $row['fecha_vencimiento'];
                $res[$i]['medicamento'] = $row['medicamento'];
                $i++;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        }
    } else{
        echo "ERROR";
    }
?>