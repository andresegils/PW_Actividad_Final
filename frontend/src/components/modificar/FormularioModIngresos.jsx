import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../Nav';

const FormularioIngresos = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [medicamentos, setMedicamentos] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    const [proveedor, setProveedor] = useState();
    const [medicamento, setMedicamento] = useState();
    const [fechaRecibido, setFechaRecibido] = useState();
    const [cantidad, setCantidad] = useState();
    const [codigoLote, setCodigoLote] = useState();
    const [fechaVencimientoLote, setFechaVencimientoLote] = useState();
    const [numeroFactura, setNumeroFactura] = useState();
    const [numeroControl, setNumeroControl] = useState();
    const [fechaFactura, setFechaFactura] = useState();
    const [fechaVencimientoFactura, setFechaVencimientoFactura] = useState();
    const [lote, setLote] = useState();
    const [factura, setFactura] = useState();

    useEffect(() => {
        axios.create({
            baseURL: `http://localhost/backend_gil/medicamentos/read.php/`
          }).get().then((res) => {
            setMedicamentos(res.data);
            setLoading1(false);
            console.log(res.data);
          }).catch((e) => console.log(e));

        axios.create({
            baseURL: `http://localhost/backend_gil/proveedor/read.php/`
          }).get().then((res) => {
            setProveedores(res.data);
            setLoading2(false);
            console.log(res.data);
          }).catch((e) => console.log(e));

        axios.create({
            baseURL: `http://localhost/backend_gil/ingreso/read.php/`
          }).get().then((res) => {
            let x = res.data.filter(x => x.id == id)[0]
            console.log(x);
            setProveedor(x.proveedor)
            setMedicamento(x.medicamento)
            setFechaRecibido(x.fecha_recibido)
            setCantidad(x.cantidad)
            setCodigoLote(x.lote)
            setFechaVencimientoLote(x.fecha_vencimiento_lote)
            setNumeroFactura(x.factura)
            setNumeroControl(x.numero_control)
            setFechaFactura(x.fecha_factura)
            setFechaVencimientoFactura(x.fecha_vencimiento_factura)
            setLote(x.idlote);
            setFactura(x.idfactura);
            setLoading3(false);
            console.log(res.data);
          }).catch((e) => console.log(e));
    }, []);

    const enviarFormulario = async (e) => {
        e.preventDefault();

        console.log({
            id,
            medicamento: document.getElementById('medicamento').value,
            fecha_recibido: document.getElementById('fecha_recibido').value,
            cantidad: document.getElementById('cantidad').value,
            
            codigo_lote: document.getElementById('codigo_lote').value,
            fecha_vencimiento_lote: document.getElementById('fecha_vencimiento_lote').value,

            lote,

            numero_factura: document.getElementById('numero_factura').value,
            numero_control: document.getElementById('numero_control').value,
            fecha_factura: document.getElementById('fecha_factura').value,
            fecha_vencimiento_factura: document.getElementById('fecha_vencimiento_factura').value,

            usuario: 1,
            proveedor: document.getElementById('proveedor').value,
            factura,
        });

        let res = undefined;
        await axios.create({
            baseURL: 'http://localhost/backend_gil/ingreso/update.php/',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).post('',
            {
                id,
                medicamento: document.getElementById('medicamento').value,
                fecha_recibido: document.getElementById('fecha_recibido').value,
                cantidad: document.getElementById('cantidad').value,
                
                codigo_lote: document.getElementById('codigo_lote').value,
                fecha_vencimiento_lote: document.getElementById('fecha_vencimiento_lote').value,

                lote,

                numero_factura: document.getElementById('numero_factura').value,
                numero_control: document.getElementById('numero_control').value,
                fecha_factura: document.getElementById('fecha_factura').value,
                fecha_vencimiento_factura: document.getElementById('fecha_vencimiento_factura').value,

                usuario: 1,
                proveedor: document.getElementById('proveedor').value,
                factura,
            }).then((r) => {
                console.log(r.data);
                if(r.data.status == 200){
                    alert("Modificación Exitosa.");
                    navigate('/consultar/ingresos/');
                } else
                    alert("Error al modificar.")
            }).catch(e => {
                alert("Error al modificar.");
            });
    };

    if(loading1 || loading2 || loading3)
        return <h2>Cargando...</h2>

    return (
        <main className="container">
            <Nav />
            <form>

                <h4>Datos de los Insumos Recibidos</h4>
                <label htmlFor="medicamento">Medicamento:</label>
                <select name="medicamento" id="medicamento" className='form-control' value={medicamento} onChange={(e) => setMedicamento(e.target.value)}>
                    {medicamentos.map((x) => (
                        <option value={x.id}>{x.id} - {x.nombre} ({x.marca})</option>
                    ))}
                </select>

                <label htmlFor="fecha_recibido">Fecha Recibido:</label>
                <input value={fechaRecibido} onChange={(e) => setFechaRecibido(e.target.value)} id='fecha_recibido' type="datetime-local" required className='form-control' />

                <label htmlFor="cantidad">Cantidad Recibida:</label>
                <input value={cantidad} onChange={(e) => setCantidad(e.target.value)} id='cantidad' type="number" min={0.01} step={0.01} required className='form-control' />

                <label htmlFor="proveedor">Proveedor:</label>
                <select value={proveedor} onChange={(e) => setProveedor(e.target.value)} name="proveedor" id="proveedor" className='form-control'>
                    {proveedores.map((x) => (
                        <option value={x.id}>{x.rif} - {x.nombre}</option>
                    ))}
                </select>

                <hr />

                <h4>Datos del Lote del Insumo</h4>

                <label htmlFor="codigo_lote">Código Lote:</label>
                <input value={codigoLote} onChange={(e) => setCodigoLote(e.target.value)} type='text' maxLength={45} required name="codigo_lote" id="codigo_lote" className='form-control' />

                <label htmlFor="fecha_vencimiento_lote">Fecha de Vencimiento del Lote:</label>
                <input value={fechaVencimientoLote} onChange={(e) => setFechaVencimientoLote(e.target.value)} type='datetime-local' required name="fecha_vencimiento_lote" id="fecha_vencimiento_lote" className='form-control' />

                <hr/>

                <h4>Datos de la Factura Asociada</h4>

                <label htmlFor="numero_factura">Número de Factura:</label>
                <input value={numeroFactura} onChange={(e) => setNumeroFactura(e.target.value)} type='text' maxLength={45} required name="numero_factura" id="numero_factura" className='form-control' />

                <label htmlFor="numero_control">Número de Control:</label>
                <input value={numeroControl} onChange={(e) => setNumeroControl(e.target.value)} type='text' maxLength={45} required name="numero_control" id="numero_control" className='form-control' />

                <label htmlFor="fecha_factura">Fecha de Facturación:</label>
                <input value={fechaFactura} onChange={(e) => setFechaFactura(e.target.value)} type='datetime-local' required name="fecha_factura" id="fecha_factura" className='form-control' />

                <label htmlFor="fecha_vencimiento_factura">Fecha de Vencimiento de la Factura:</label>
                <input value={fechaVencimientoFactura} onChange={(e) => setFechaVencimientoFactura(e.target.value)} type='datetime-local' required name="fecha_vencimiento_factura" id="fecha_vencimiento_factura" className='form-control' />

                <button type="submit" className='btn btn-success' onClick={enviarFormulario}>Enviar</button>
            </form>
        </main>
    );
};

export default FormularioIngresos;