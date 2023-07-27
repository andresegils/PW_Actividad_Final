import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

const Home = () => {
  const navigate = useNavigate();

  return (
      <main class="container">
        <Nav />
        <h1 className='text-center'>¡Bienvenido!</h1>
        <a class="btn btn-primary" href="/consultar/proveedores/">Proveedores </a>
        <a class="btn btn-secondary" href="/consultar/medicamentos/">Medicamentos </a>
        <a class="btn btn-success" href="/consultar/ingresos/">Ingresos </a>
        <a class="btn btn-danger" href="/consultar/facturas/">Facturas </a>
      </main>
    )
}

export default Home;