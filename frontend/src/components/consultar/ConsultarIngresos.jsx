import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Nav from '../Nav';
import Chart from 'chart.js/auto';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfMake from "html-to-pdfmake";

const ConsultarTarjeta = () => {

    const [datos, setDatos] = useState({});
    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        axios.create({
            baseURL: `http://localhost/backend_gil/ingreso/read.php/`
          }).get().then((res) => {
            setDatos(res.data);
            setLoading1(false);
            console.log(res.data);
            graficar();
          }).catch((e) => console.log(e));
    }, []);

    const eliminar = async (id, idfactura, idlote) => {
        console.log(id);
        console.log(idfactura);
        console.log(idlote);

        await axios.create({
            baseURL: 'http://localhost/backend_gil/ingreso/delete.php/',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).post('',
            {
                id,
                idfactura,
                idlote
            }).then((r) => {
                console.log(r.data);
                if(r.data.status == 200){
                    alert("Eliminación Exitosa.");
                    window.location.replace('/consultar/ingresos/');
                } else
                    alert("Error al eliminar.")
            }).catch(e => {
                alert("Error al eliminar.");
            });
    };

    const descargarReporte = () => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        var texto = "";
        datos.map((x) => {
            texto += `<tr>`
            texto += `  <td>${x.medicamento} (${x.marca_medicamento})</td>
                        <td>${x.cantidad}</td>
                        <td>${x.lote}</td>
                        <td>${x.fecha_ingreso}</td>
                        <td>${x.nombre_proveedor} (${x.rif_proveedor})</td>
                        <td>${x.factura}</td>`
            texto += `</tr>`
        });
        let html = `<div><h1>Reporte de Medicamentos</h1>
        <table border=3>
            <thead>
                <tr>
                <td className='text-dark'>Medicamento</td>
                    <td className='text-dark'>Cantidad</td>
                    <td className='text-dark'>Lote</td>
                    <td className='text-dark'>Fecha Recibido</td>
                    <td className='text-dark'>Proveedor</td>
                    <td className='text-dark'># Factura</td>
                </tr>
            </thead>
            <tbody>` + texto + `
            </tbody>
        </table>
        </div>`;

        console.log(html);

        let document = {content: htmlToPdfMake(html)};
        
        pdfMake.createPdf(document).print();
    };

    const graficar = () => {
        let chart = null;
            let canvas = document.getElementById('grafica').getContext('2d');
            let datosGrafica = undefined;

            axios.create({
                        baseURL: "http://localhost/backend_gil/graficas/ingresos.php/"
                    }).get().then((res) => {
                        console.log(res.data);
                        datosGrafica = res.data;
                        chart = new Chart(canvas, {
                            type: 'bar',
                            data: {
                                datasets: [
                                    {
                                        data: Object.values(datosGrafica),
                                        backgroundColor: ['#0F0',]
                                    }
                                ],
                                labels: Object.keys(datosGrafica)
                            },
                            options: {
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Ingresos por Día',
                                        position: 'top'
                                    },
                                    legend: {
                                        display: false
                                    }
                                }        
                            }
                });
                    }).catch((e) => console.log(e));
    };

    if(loading1)
        return <h1>Cargando...</h1>

    return (
      <main className='container'>
        <Nav />
        <canvas id='grafica' height={100}></canvas> <br />
        <a href='/crear/ingresos/' className='btn btn-success'>Crear Ingresos</a>
        <button className='btn btn-secondary' onClick={descargarReporte}>Reporte PDF</button>
        <table className='table table-bordered table-hover'>
            <thead>
                <tr className='table-dark'>
                    <td className='text-dark'>Medicamento</td>
                    <td className='text-dark'>Cantidad</td>
                    <td className='text-dark'>Lote</td>
                    <td className='text-dark'>Fecha de Ingreso</td>
                    <td className='text-dark'>Fecha Recibido</td>
                    <td className='text-dark'>Registrado por</td>
                    <td className='text-dark'>Proveedor</td>
                    <td className='text-dark'># Factura</td>
                    <td className='text-dark'>Acciones</td>
                </tr>
            </thead>
            <tbody>
                {datos.map(x => (
                    <tr key={x.id}>
                        <td>{x.medicamento} ({x.marca_medicamento})</td>
                        <td>{x.cantidad}</td>
                        <td>{x.lote}</td>
                        <td>{x.fecha_ingreso}</td>
                        <td>{x.fecha_recibido}</td>
                        <td>{x.nombre_usuario} ({x.tipo_usuario}{x.cedula_usuario})</td>
                        <td>{x.nombre_proveedor} ({x.rif_proveedor})</td>
                        <td>{x.factura}</td>
                        <td>
                            <a href={"/editar/ingresos/" + x.id} className='btn btn-success'>Editar</a>
                            <button className='btn btn-danger' onClick={(e) => eliminar(x.id, x.idfactura, x.idlote)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            
      </main>      
    );
};

export default ConsultarTarjeta;