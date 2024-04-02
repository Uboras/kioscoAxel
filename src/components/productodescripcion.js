import React from 'react';
import "../styles/busquedaproducto.css";
const Producto = ({ producto }) => {
  
  return (
    <div className='conteiner-lista_productodescripcion'>
      <p>{producto.id} </p>
      <p><strong> {producto.descripcion}</strong> </p>
      <p> Precio ${producto.precio}. </p>
      <p> Cantidad {producto.cantidad}</p>
      </div>
  );
};

export default Producto;
