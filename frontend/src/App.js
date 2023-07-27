import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import LogIn from './components/LogIn';

import FormularioProveedores from './components/crear/FormularioProveedores.jsx';
import FormularioIngresos from './components/crear/FormularioIngresos.jsx';
import FormularioMedicamentos from './components/crear/FormularioMedicamentos.jsx';

import FormularioModProveedores from './components/modificar/FormularioModProveedores.jsx';
import FormularioModMedicamentos from './components/modificar/FormularioModMedicamentos.jsx';
import FormularioModIngresos from './components/modificar/FormularioModIngresos.jsx';

import ConsultarLotes from './components/consultar/ConsultarLotes.jsx';
import ConsultarProveedores from './components/consultar/ConsultarProveedores.jsx';
import ConsultarIngresos from './components/consultar/ConsultarIngresos.jsx';
import ConsultarFacturas from './components/consultar/ConsultarFacturas.jsx';
import ConsultarMedicamento from './components/consultar/ConsultarMedicamento.jsx';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Control */}
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<LogIn />} />

          {/* Consultar */}
          <Route path='/consultar/medicamentos/' element={<ConsultarMedicamento />} />
          <Route path='/consultar/proveedores/' element={<ConsultarProveedores />} />
          <Route path='/consultar/ingresos/' element={<ConsultarIngresos />} />
          <Route path='/consultar/facturas/' element={<ConsultarFacturas />} />
          <Route path='/consultar/lotes/:medic' element={<ConsultarLotes />} />

          {/* Creación */}
          <Route path='/crear/proveedores' element={<FormularioProveedores />} />
          <Route path='/crear/medicamentos' element={<FormularioMedicamentos />} />
          <Route path='/crear/ingresos' element={<FormularioIngresos />} />

          {/* Modificación */}
          <Route path='/editar/proveedor/:id' element={<FormularioModProveedores />} />
          <Route path='/editar/medicamentos/:id' element={<FormularioModMedicamentos />} />
          <Route path='/editar/ingresos/:id' element={<FormularioModIngresos />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
