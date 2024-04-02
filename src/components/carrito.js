// Carrito.js
import React from 'react';
import "../styles/Carrito.css"

const Carrito = ({ carrito, removeFromCart,removeFromCart1 }) => {
  return (
    <div className='container-lista-carrito'>
      <h2 className='container-lista-productos_titulo'>Carrito de Compras</h2>
      <ul className='container-lista_productos'>
        {carrito.map((producto) => (
          <li className='producto-agregado' key={producto.id}>
          {producto.descripcion } <br></br> {producto.id}  ${producto.precio} X {producto.cantidad} = ${producto.precio*producto.cantidad}
          <div className='boton-carrito'>
            <button onClick={() => removeFromCart(producto.id)}>Eliminar Todos</button>
            <button onClick={() => removeFromCart1(producto.id)}>Eliminar Una cantidad</button>
          </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carrito;
