<?php
    include('../db_connection.php');
    header('Access-Control-Allow-Origin: *');

    $query = "SELECT idingreso, cantidad, lote.idlote AS idlote, lote.fecha_vencimiento AS fecha_vencimiento_lote, factura.idfactura AS idfactura,
    factura.fecha_factura AS fecha_factura, factura.fecha_vencimiento AS fecha_vencimiento_factura, factura.numero_control AS numero_control, proveedor,
    fecha_recibido, ingreso.fecha_ingreso AS fecha_ingreso, usuario.nombre AS nombre_usuario, usuario.tipo AS tipo_usuario, usuario.cedula AS cedula_usuario, proveedor.nombre AS nombre_proveedor, proveedor.rif AS rif_proveedor, medicamento.nombre AS medicamento, medicamento.marca AS marca_medicamento, factura.numero_factura AS factura, lote.codigo_lote AS lote FROM ingreso INNER JOIN usuario ON usuario.idusuario = usuario INNER JOIN proveedor ON proveedor.idproveedor = proveedor INNER JOIN factura ON factura.idfactura = factura INNER JOIN lote ON lote.idlote = lote INNER JOIN  medicamento ON medicamento.idmedicamento = lote.medicamento;";
    $res = array();

    if($conn){
        $result = mysqli_query($conn, $query);
        if($result){
            header('Content-Type: JSON');
            $i = 0;
            while($row = mysqli_fetch_assoc($result)){
                $res[$i]['id'] = $row['idingreso'];
                $res[$i]['cantidad'] = $row['cantidad'];
                $res[$i]['fecha_ingreso'] = $row['fecha_ingreso'];
                $res[$i]['fecha_recibido'] = $row['fecha_recibido'];
                $res[$i]['nombre_usuario'] = $row['nombre_usuario'];
                $res[$i]['tipo_usuario'] = $row['tipo_usuario'];
                $res[$i]['cedula_usuario'] = $row['cedula_usuario'];
                $res[$i]['nombre_proveedor'] = $row['nombre_proveedor'];
                $res[$i]['medicamento'] = $row['medicamento'];
                $res[$i]['rif_proveedor'] = $row['rif_proveedor'];
                $res[$i]['marca_medicamento'] = $row['marca_medicamento'];
                $res[$i]['factura'] = $row['factura'];
                $res[$i]['proveedor'] = $row['proveedor'];
                $res[$i]['lote'] = $row['lote'];
                $res[$i]['idlote'] = $row['idlote'];
                $res[$i]['idfactura'] = $row['idfactura'];
                $res[$i]['numero_control'] = $row['numero_control'];
                $res[$i]['fecha_factura'] = $row['fecha_factura'];
                $res[$i]['fecha_vencimiento_factura'] = $row['fecha_vencimiento_factura'];
                $res[$i]['fecha_vencimiento_lote'] = $row['fecha_vencimiento_lote'];
                $i++;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        }
    } else{
        echo "ERROR";
    }
?>