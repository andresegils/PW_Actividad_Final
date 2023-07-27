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

    const graficar = () => {
        let chart = null;
            let canvas = document.getElementById('grafica').getContext('2d');
            let datosGrafica = {vencidas: 0, vigentes: 0};

            axios.create({
                        baseURL: "http://localhost/backend_gil/graficas/facturas.php/"
                    }).get().then((res) => {
                        console.log(res.data);
                        for(let i = 0; i < res.data.length; i++){
                            if(new Date(res.data[i].fecha_vencimiento) < new Date()){
                                datosGrafica['vencidas']++;
                            } else{
                                datosGrafica['vigentes']++;
                            }
                        }
                        chart = new Chart(canvas, {
                            type: 'pie',
                            data: {
                                datasets: [
                                    {
                                        data: Object.values(datosGrafica),
                                        backgroundColor: ['#F00', '#0F0']
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
        datos.filter(x => x.nombre != '').map((x) => {
            texto += `<tr>`
            texto += `<td>${x.numero_factura}</td>
            <td>${x.numero_control}</td>
            <td>${x.fecha_factura}</td>
            <td>${x.fecha_vencimiento}</td>`
            texto += `</tr>`
        });
        let html = `<div><h1>Reporte de Facturas</h1>
        <table border=3>
            <thead>
                <tr>
                <td className='text-dark'>Número Factura</td>
                <td className='text-dark'>Número de Control</td>
                <td className='text-dark'>Fecha Factura</td>
                <td className='text-dark'>Fecha de Vencimiento</td>
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
            baseURL: `http://localhost/backend_gil/factura/read.php/`
          }).get().then((res) => {
            setDatos(res.data);
            setLoading1(false);
            console.log(res.data);
            graficar();
          }).catch((e) => console.log(e));
    }, []);

    if(loading1)
        return <h1>Cargando...</h1>

    return (
      <main className='container'>
        <Nav />
        <canvas id='grafica' style={{maxHeight: '300px', maxWidth: '300px'}}></canvas> <br />
        <button className='btn btn-secondary' onClick={descargarReporte}>Reporte PDF</button>
        <table className='table table-bordered table-hover'>
            <thead>
                <tr className='table-dark'>
                    <td className='text-dark'>Número Factura</td>
                    <td className='text-dark'>Número de Control</td>
                    <td className='text-dark'>Fecha Factura</td>
                    <td className='text-dark'>Fecha de Vencimiento</td>
                </tr>
            </thead>
            <tbody>
                {datos.map(x => (
                    <tr key={x.id}>
                        <td>{x.numero_factura}</td>
                        <td>{x.numero_control}</td>
                        <td>{x.fecha_factura}</td>
                        <td>{x.fecha_vencimiento}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </main>      
    );
};

export default ConsultarTarjeta;