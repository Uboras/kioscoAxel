import React, { useState, useEffect } from 'react';
import Producto from './productodescripcion';

const ListaDeProductos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [productosGuardados, setProductosGuardados] = useState([]);

  useEffect(() => {
    // Actualizar la lista de productos cada 1 segundo
    const intervalId = setInterval(() => {
      // Obtener los productos guardados del almacenamiento local o establecer un array vacío si no hay ninguno
      const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
      setProductosGuardados(productosGuardados);
    }, 1000);

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, []); // Este useEffect se ejecutará solo una vez al montar el componente

  useEffect(() => {
    // Filtrar productos según el término de búsqueda
    const filtered = productosGuardados.filter((producto) => parseInt(producto.id) === parseInt(searchTerm));
    setFilteredProductos(filtered);
  }, [productosGuardados, searchTerm]);

  function Limpiar() {
    setSearchTerm('');
  };


  return (
    <div className='container-busqueda'>
    
      <h4>Buscar detalles por Código</h4>
      <div className="container-busqueda_productos">
        <input
          id="input-productosBuscado"
          min={0}
          type="number"
          placeholder="Buscar por Código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <button onClick={Limpiar}>Limpiar</button>
      </div>
      <div className="lista-productos">
        {filteredProductos.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
        
      
    </div>
    </div>
  );
}

export default ListaDeProductos;
