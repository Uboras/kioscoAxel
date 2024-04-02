import React from 'react';


function ListaProductos() {
   const productos = JSON.parse(localStorage.getItem("productos")) || [];
 

  return (
    <div className='container-reportes'>
      <h2 className='tituloLista'>Lista Negativos</h2>
      <ul>
        {productos.map((producto) => (
         (producto.cantidad<= 0)? 
          <li className='itemlista' key={producto.id}>
            <span> Cantidad: {producto.cantidad} | {producto.id} | {producto.descripcion} </span>
        
          </li>:  ""
        ))}
      </ul>
    </div>
  );
}

export default ListaProductos;
