import React from 'react';

const Producto = ({ producto, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(producto);
  };

  return (
    <div className='container-producto'>
      <p className='texto-producto-precio'>{producto.nombre}</p>
      <p className='texto-producto-precio'>Precio: ${producto.precio}</p>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
};

export default Producto;
