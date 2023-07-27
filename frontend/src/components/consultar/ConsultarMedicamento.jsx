import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Nav from '../Nav';
import Chart from 'chart.js/auto';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfMake from "html-to-pdfmake";

const ConsultarActividad = () => {

    const [datos, setDatos] = useState({});
    const [loading1, setLoading1] = useState(true);

    const graficar = () => {
        let chart = null;
            let canvas = document.getElementById('grafica').getContext('2d');
            let datosGrafica = {vencidas: 0, vigentes: 0};

            axios.create({
                        baseURL: "http://localhost/backend_gil/graficas/medicamentos.php/"
                    }).get().then((res) => {
                        console.log(res.data);
                        datosGrafica = res.data;
                        chart = new Chart(canvas, {
                            type: 'pie',
                            data: {
                                datasets: [
                                    {
                                        data: Object.values(datosGrafica),
                                        backgroundColor: ['#F00', '#0F0', '#00F']
                                    }
                                ],
                                labels: Object.keys(datosGrafica)
                            },
                            options: {
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Relación de Facturas Vigentes y Vencidas',
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

    const descargarReporte = () => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        var texto = "";
        datos.map((x) => {
            texto += `<tr>`
            texto += `  <td>${x.id}</td>
                        <td>${x.nombre}</td>
                        <td>${x.marca}</td>
                        <td>${x.clasificacion}</td>
                        <td>${x.fecha_ingreso}</td>`
            texto += `</tr>`
        });
        let html = `<div><h1>Reporte de Medicamentos</h1>
        <table border=3>
            <thead>
                <tr>
                <td className='text-dark'>ID</td>
                    <td className='text-dark'>Nombre</td>
                    <td className='text-dark'>Marca</td>
                    <td className='text-dark'>Clasificación</td>
                    <td className='text-dark'>Fecha Ingreso</td>
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

    useEffect(() => {
        axios.create({
            baseURL: `http://localhost/backend_gil/medicamentos/read.php/`
          }).get().then((res) => {
            setDatos(res.data);
            setLoading1(false);
            console.log(res.data);
            graficar();
          }).catch((e) => console.log(e));
    }, []);

    const eliminar = async (id) => {
        await axios.create({
            baseURL: 'http://localhost/backend_gil/medicamentos/delete.php/',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).post('',
            {
                id
            }).then((r) => {
                console.log(r.data);
                if(r.data.status == 200){
                    alert("Eliminación Exitosa.");
                    window.location.replace('/consultar/medicamentos/');
                } else
                    alert("Error al eliminar.")
            }).catch(e => {
                alert("Error al eliminar.");
            });
    };

    if(loading1)
        return <h1>Cargando...</h1>

    return (
      <main className='container'>
        <Nav />
        <canvas id='grafica' style={{maxHeight: '300px', maxWidth: '300px'}}></canvas> <br />
        <button className='btn btn-secondary' onClick={descargarReporte}>Reporte PDF</button>
        <a href="/crear/medicamentos/" className='btn btn-success'>Registrar Nuevo Medicamentos</a>
        <table className='table table-bordered table-hover'>
            <thead>
                <tr className='table-dark'>
                    <td className='text-dark'>ID</td>
                    <td className='text-dark'>Nombre</td>
                    <td className='text-dark'>Marca</td>
                    <td className='text-dark'>Clasificación</td>
                    <td className='text-dark'>Fecha Ingreso</td>
                    <td className='text-dark'>Lotes</td>
                    <td className='text-dark'>Acciones</td>
                </tr>
            </thead>
            <tbody>
                {datos.map(x => (
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.nombre}</td>
                        <td>{x.marca}</td>
                        <td>{x.clasificacion}</td>
                        <td>{x.fecha_ingreso}</td>
                        <td><a href={`/consultar/lotes/${x.id}`} className='btn btn-success'>Lotes</a></td>
                        <td>
                            <a href={'/editar/medicamentos/' + x.id} className='btn btn-primary'>Editar</a>
                            <button className='btn btn-danger' onClick={(e) => eliminar(x.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </main>      
    );
};

export default ConsultarActividad;