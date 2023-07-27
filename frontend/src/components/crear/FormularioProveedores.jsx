import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav';

const FormularioClientes = () => {
    const navigate = useNavigate();
    const enviarFormulario = async (e) => {
        e.preventDefault();

        let res = undefined;
        await axios.create({
            baseURL: 'http://localhost/backend_gil/proveedor/create.php/',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).post('',
            {
                nombre: document.getElementById('nombre').value,
                rif: document.getElementById('rif').value,
            }).then((r) => {
                console.log(r.data);
                if(r.data.status == 200){
                    alert("Creación Exitosa.");
                    navigate('/consultar/proveedores/');
                } else
                    alert("Error al crear. Verifique datos y que el RIF no esté duplicado.")
            }).catch(e => {
                alert("Error al crear. Verifique datos y que el RIF no esté duplicado.");
            });
    };

    return (
        <main className="container">
            <Nav />
            <form>
                <label htmlFor="rif">RIF:</label>
                <input id='rif' type="text" minLength={10} maxLength={10} className='form-control' placeholder='J000000000' required/>

                <label htmlFor="nombre">Razón Social:</label>
                <input id='nombre' type="text" maxLength={45} className='form-control' placeholder='Medicare LLC' required />

                <button type="submit" className='btn btn-success' onClick={enviarFormulario}>Enviar</button>
            </form>
        </main>
    );
};

export default FormularioClientes;