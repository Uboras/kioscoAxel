import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import App from './components/App';
import Cargar from './components/Cargar';
import Actualizar from './components/Actualizar';
import Bannerizquierdo from './components/bannerizquierdo';
import Reportes from "./components/Reportes";
import ReportesNegativos from "./components/reporteNegativos"
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <div>
      <Bannerizquierdo /> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/App" element={<App />} />
        <Route path="/cargar" element={<Cargar />} />
        <Route path="/actualizar" element={<Actualizar />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/listanegativa" element={<ReportesNegativos />} />
      </Routes>
    </div>
  </Router>
);

reportWebVitals();