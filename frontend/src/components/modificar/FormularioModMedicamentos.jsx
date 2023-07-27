import axios from 'axios';
import React, {useState, useLayoutEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../Nav';

const FormularioModMedicamentos = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState();
    const [marca, setMarca] = useState("");
    const [nombre, setNombre] = useState("");
    const [clasificacion, setClasificacion] = useState("")

    useLayoutEffect(() => {
        axios.create({
            baseURL: `http://localhost/backend_gil/medicamentos/read.php/`
          }).get().then((res) => {
            console.log(res.data);
            let x = res.data.filter(x => {
                console.log(x.id);
                console.log(id);
                return x.id == id;
            })[0];
            setLoading(false);
            setMarca(x.marca);
            setNombre(x.nombre);
            setClasificacion(x.clasificacion);
          }).catch((e) => console.log(e));
    }, []);
    

    const enviarFormulario = async (e) => {
        e.preventDefault();

        let res = undefined;
        await await axios.create({
            baseURL: 'http://localhost/backend_gil/usuario/login.php/',
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
                <label htmlFor="marca">Marca:</label>
                <input value={marca} onChange={(e) => setMarca(e.target.value)} id='marca' type="text" minLength={10} maxLength={10} className='form-control' required/>

                <label htmlFor="nombre">Razón Social:</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} id='nombre' type="text" maxLength={45} className='form-control' required />

                <label htmlFor="clasificacion">Clasificación:</label>
                <select name="clasificacion" id="clasificacion" className='form-control' value={clasificacion} onChange={(e) => setClasificacion(e.target.value)}>
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

                <button type="submit" className='btn btn-success' onClick={enviarFormulario}>Enviar</button>
            </form>
        </main>
    );
};

export default FormularioModMedicamentos;