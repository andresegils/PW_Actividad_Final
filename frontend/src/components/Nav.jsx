import React from 'react'

const Nav = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/home">Farmacia SAAS</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="/consultar/proveedores/">Proveedores </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/consultar/medicamentos/">Medicamentos </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/consultar/ingresos/">Ingresos </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/consultar/facturas/">Facturas </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/">Cerrar Sesión </a>
            </li>
            </ul>
        </div>
    </nav>
  )
}

export default Nav;