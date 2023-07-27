import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    });

    const logIn = async (e) => {
        e.preventDefault();
        let inicioSesion = false;

        console.log({
          tipo: document.getElementById('usuario').value.charAt(0),
          cedula: document.getElementById('usuario').value.substring(1),
          contrasena: document.getElementById('contrasena').value
      });

        const a = await axios.create({
          baseURL: 'http://localhost/backend_gil/usuario/login.php/',
          headers: {
              'Content-Type': 'application/json'
          }
        }
        ).post('',
          {
              tipo: document.getElementById('usuario').value.charAt(0),
              cedula: document.getElementById('usuario').value.substring(1),
              contrasena: document.getElementById('contrasena').value
          }).then((r) => {
              console.log(r.data);
              if(r.data[0].estado == 200){
                  alert("Ha iniciado sesión.");
                  navigate('/home');
              } else
                  alert("Error al iniciar sesión.")
          }).catch(e => {
              alert("Error al modificar. Verifique datos y que el RIF no esté duplicado.");
          });
    };

    return (<main className='container'>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/home">Farmacia SAAS</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
      </nav>
      <div>
        <h1>Farmacias SAAS</h1>
        <h2>Sistema de Inventario</h2>

        <form onSubmit={(e) => logIn(e)}>
          <label htmlFor="usuario">Usuario:</label>
          <input pattern='V[0-9]+' maxLength={9} className='form-control' type="text" name="usuario" id="usuario" required placeholder='V12345678' />

          <label htmlFor="contrasena">Contraseña:</label>
          <input className='form-control' type="password" name="contrasena" id="contrasena" />

          <br />

          <button type="submit" className='btn btn-primary'>Iniciar Sesión</button>
        </form>
      </div>
    </main>)
};

export default LogIn;