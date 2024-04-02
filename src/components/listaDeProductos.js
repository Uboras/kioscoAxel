import React, { useState, useEffect } from 'react';
import Producto from './producto';

const ListaDeProductos = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productos, setProductos] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
       const productos = JSON.parse(productosGuardados);
          setProductos(productos);
          console.log('Productos recuperados del almacenamiento local:', productos);
        } else {
          console.error('No se encontraron productos en el almacenamiento localStorage.');
        }
      }, []);
      
  const filteredProductos = productos.filter((producto) => parseInt(producto.id) === parseInt(searchTerm));

  useEffect(() => {
    const handleAddToCartAutomatically = () => {
      if (filteredProductos.length === 1 && !addedToCart) {
        addToCart(filteredProductos[0]);
        setAddedToCart(true);
        setSearchTerm(''); // Limpiar el término de búsqueda
        document.getElementById('input-productos').value = '';
        setTimeout(() => {
          setAddedToCart(false);
        }, 1000);
      }
    };

    handleAddToCartAutomatically();
  }, [filteredProductos, addToCart, addedToCart]);

  return (
    <div className="container-lista ">
      <div className="container-lista_productos">
        <h2>Lista de Productos</h2>
        <input
          id="input-productos"
          min={0}
          type="number"
          placeholder="Buscar por Código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
      </div>
      <div className="lista-productos">
        {filteredProductos.map((producto) => (
          <Producto key={producto.id} producto={producto} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ListaDeProductos;
