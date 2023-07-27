import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Nav from '../Nav';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfMake from "html-to-pdfmake";

const ConsultarClientes = () => {

    const [datos, setDatos] = useState({});
    const {medic} = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const descargarReporte = () => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        var texto = "";
        datos.map((x) => {
            texto += `<tr>`
            texto += `  <td>${x.id}</td>
                        <td>${x.codigo_lote}</td>
                        <td>${x.fecha_vencimiento}</td>`
            texto += `</tr>`
        });
        let html = `<div><h1>Reporte de Lotes</h1>
        <table border=3>
            <thead>
                <tr>
                        <td className='text-dark'>ID</td>                        
                        <td className='text-dark'>Código Lote</td>
                        <td className='text-dark'>Fecha Vencimiento</td>
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
            baseURL: `http://localhost/backend_gil/lote/read.php/`
          }).get().then((res) => {
            setDatos(res.data);
            setLoading(false);
            console.log(res.data);
          }).catch((e) => console.log(e));
    }, []);

    if(loading)
        return <h1>Cargando...</h1>    

        return (
            <main className='container'>
                <Nav />
              <a href="/consultar/medicamentos/" className='btn btn-secondary'>Regresar</a>
              <button className='btn btn-secondary' onClick={descargarReporte}>Reporte PDF</button>
              <table className='table table-bordered table-hover'>
                  <thead>
                      <tr className='table-dark'>
                          <td className='text-dark'>ID</td>                        
                          <td className='text-dark'>Código Lote</td>
                          <td className='text-dark'>Fecha Vencimiento</td>
                      </tr>
                  </thead>
                  <tbody>
                      {datos.filter(x => x.medicamento == medic).map(x => (
                          <tr key={x.id}>
                              <td>{x.id}</td>
                              <td>{x.codigo_lote}</td>
                              <td>{x.fecha_vencimiento}</td>
                          </tr>
                      ) )}
                  </tbody>
              </table>
            </main>      
          );
};

export default ConsultarClientes;