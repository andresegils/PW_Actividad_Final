import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from '../Nav';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfMake from "html-to-pdfmake";

const ConsultarClientes = () => {

    const [datos, setDatos] = useState({});
    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        axios.create({
            baseURL: `http://localhost/backend_gil/proveedor/read.php/`
          }).get().then((res) => {
            setDatos(res.data);
            setLoading1(false);
            console.log(res.data);
          }).catch((e) => console.log(e));
    }, []);

    const descargarReporte = () => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        var texto = "";
        datos.filter(x => x.nombre != '').map((x) => {
            texto += `<tr>`
            texto += `<td>${x.id}</td>`
            texto += `<td>${x.nombre}</td>`
            texto += `<td>${x.rif}</td>`
            texto += `</tr>`
        });
        let html = `<div><h1>Reporte de Proveedores</h1>
        <table border=3>
            <thead>
                <tr>
                    <td className='text-dark'>ID</td>
                    <td className='text-dark'>Razón Social</td>
                    <td className='text-dark'>RIF</td>
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

    const eliminar = async (id) => {
        await axios.create({
            baseURL: 'http://localhost/backend_gil/proveedor/delete.php/',
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
                    window.location.replace('/consultar/proveedores/');
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
        <Link to="/crear/proveedores/" className='btn btn-success'>Registrar Nuevo Proveedor</Link>
        <button className='btn btn-secondary' onClick={descargarReporte}>Reporte PDF</button>
        <table className='table table-bordered table-hover'>
            <thead>
                <tr className='table-dark'>
                    <td className='text-dark'>ID</td>
                    <td className='text-dark'>Razón Social</td>
                    <td className='text-dark'>RIF</td>
                    <td className='text-dark'>Acciones</td>
                </tr>
            </thead>
            <tbody>
                {datos.filter(x => x.nombre != '').map(x => (
                    <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.nombre}</td>
                        <td>{x.rif}</td>
                        <td>
                            <Link to={'/editar/proveedor/' + x.id} className='btn btn-primary'>Editar</Link>
                            <button className='btn btn-danger' onClick={(e) => eliminar(x.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </main>      
    );
};

export default ConsultarClientes;