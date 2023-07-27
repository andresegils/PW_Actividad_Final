import axios from 'axios';
import React, {useState, useLayoutEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../Nav';

const FormularioModProveedores = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState();
    const [rif, setRif] = useState("")
    const [nombre, setNombre] = useState("")

    useLayoutEffect(() => {
        axios.create({
            baseURL: `http://localhost/backend_gil/proveedor/read.php/`
          }).get().then((res) => {
            setDatos(res.data.filter(x => x.id == id)[0]);
            console.log(res);
            console.log(datos);
            setLoading(false);
            setRif(datos.rif);
            setNombre(datos.nombre);
          }).catch((e) => console.log(e));
    }, []);
    

    const enviarFormulario = async (e) => {
        e.preventDefault();

        let res = undefined;
        await axios.create({
            baseURL: 'http://localhost/backend_gil/proveedor/update.php/',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).post('',
            {
                nombre: document.getElementById('nombre').value,
                rif: document.getElementById('rif').value,
                id: id
            }).then((r) => {
                console.log(r.data);
                if(r.data.status == 200){
                    alert("Modificación Exitosa.");
                    navigate('/consultar/proveedores/');
                } else
                    alert("Error al modificar. Verifique datos y que el RIF no esté duplicado.")
            }).catch(e => {
                alert("Error al modificar. Verifique datos y que el RIF no esté duplicado.");
            });
    };

    if(loading)
        return <h2>Cargando...</h2>;

    return (
        <main className="container">
            <Nav />
            <form>
                <label htmlFor="rif">RIF:</label>
                <input value={rif} onChange={(e) => setRif(e.target.value)} id='rif' type="text" minLength={10} maxLength={10} className='form-control' placeholder='J000000000' required/>

                <label htmlFor="nombre">Razón Social:</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} id='nombre' type="text" maxLength={45} className='form-control' placeholder='Medicare LLC' required />

                <button type="submit" className='btn btn-success' onClick={enviarFormulario}>Enviar</button>
            </form>
        </main>
    );
};

export default FormularioModProveedores;