import React from 'react';
import '../styles/bannerizquierdo.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function NavBar() {
    return (
      <nav className='container-bannerIzquierdo'>
        <ul>
          <li>
            <Link className='container-bannerIzquierdo_Link' to="/">App</Link>
          </li>
          <li>
            <Link className='container-bannerIzquierdo_Link' to="/cargar">Cargar</Link>
          </li>
          <li>
          <Link className='container-bannerIzquierdo_Link' to="/actualizar">Actualizar</Link>
          </li>
          <li>
          <Link className='container-bannerIzquierdo_Link' to="/reportes">Reportes</Link>
          </li>
          <li>
          <Link className='container-bannerIzquierdo_Link' to="/listanegativa">Negativos</Link>
          </li>
        </ul>
      </nav>
    );
  }
  export default NavBar;