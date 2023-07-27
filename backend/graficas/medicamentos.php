<?php
    include('../db_connection.php');
    header('Access-Control-Allow-Origin: *');

    $query = "SELECT clasificacion.nombre AS clasificacion, COUNT(*) AS total FROM medicamento INNER JOIN clasificacion ON medicamento.clasificacion = clasificacion.idclasificacion GROUP BY clasificacion;";
    $res = array();

    if($conn){
        $result = mysqli_query($conn, $query);
        $acc = [];

        while($row = mysqli_fetch_assoc($result)){
            $acc[$row['clasificacion']] = $row['total'];
        }

        echo json_encode($acc);
    }
?>