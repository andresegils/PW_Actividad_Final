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
            baseURL: 'http://localhost/backend_gil/medicamentos/create.php/',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).post('',
            {
                nombre: document.getElementById('nombre').value,
                marca: document.getElementById('marca').value,
                clasificacion: document.getElementById('clasificacion').value,
            }).then((r) => {
                console.log(r.data);
                if(r.data.status == 200){
                    alert("Creación Exitosa.");
                    navigate('/consultar/medicamentos/');
                } else
                    alert("Error al crear.")
            }).catch(e => {
                alert("Error al crear.");
            });
    };

    return (
        <main className="container">
            <Nav />
            <form>
                <label htmlFor="nombre">Nombre:</label>
                <input id='nombre' type="text" maxLength={45} className='form-control' placeholder='ACETAMINOPHEN' required />

                <label htmlFor="marca">Marca:</label>
                <input id='marca' type="text" maxLength={45} className='form-control' placeholder='LA SANTÉ' required />

                <label htmlFor="clasificacion">Clasificación:</label>
                <select name="clasificacion" id="clasificacion" className='form-control'>
                    <option value="1">PSICOTRÓPICOS</option>
                    <option value="2">ANALGÉSICOS</option>
                    <option value="3">ANTIINFLAMATORIOS</option>
                    <option value="4">ANTIÁCIDOS</option>
                    <option value="5">ANTIULCEROSOS</option>
                    <option value="6">ANTIALÉRGICOS</option>
                    <option value="7">LAXANTES</option>
                    <option value="8">ANTIINFECCIOSOS</option>
                    <option value="9">ANTIPIRÉTICOS</option>
                    <option value="10">ANTITUSIVOS</option>
                    <option value="11">ANTIVIRALES</option>
                    <option value="12">MUCOLÍTICOS</option>
                    <option value="13">ANTIÁCIDOS</option>
                    <option value="14">SUPLEMENTOS</option>
                    <option value="15">OTROS</option>
                </select>

                <br/>

                <button type="submit" className='btn btn-success' onClick={enviarFormulario}>Enviar</button>
            </form>
        </main>
    );
};

export default FormularioClientes;