
import React, { useState } from 'react';
import ListaDeProductos from './listaDeProductos';
import Carrito from './carrito';
import SumaCarrito from './suma';
import Footer from './Footer';


import "../styles/App.css"


const App = () => {
  const [carrito, setCarrito] = useState([]);
    //agregar al carrito los productos
  const addToCart = (producto) => {
    const index = carrito.findIndex((p) => p.id === producto.id);

    if (index !== -1) {
      const newCarrito = [...carrito];
      newCarrito[index] = { ...newCarrito[index], cantidad: newCarrito[index].cantidad + 1 };
      setCarrito(newCarrito);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };
//remover producto completo
  const removeFromCart = (productoId) => {
    setCarrito(carrito.filter((producto) => producto.id !== productoId));
  };
//bajar una sola cantidad y si no hay mas se elimina el elemento
  const removeFromCart1 = (productoId) => {
    const index = carrito.findIndex((p) => p.id === productoId);

    if (index !== -1) {
      const newCarrito = [...carrito];
      if (newCarrito[index].cantidad > 1) {
        newCarrito[index] = { ...newCarrito[index], cantidad: newCarrito[index].cantidad - 1 };
      } else {
      
        newCarrito.splice(index, 1);
      }
      setCarrito(newCarrito);
    }
  };
  
  
const realizarPago = (transaccion) => {
  // Lógica para manejar el pago según el método seleccionado
  alert(`Realizando pago con: ${transaccion.tipoPago} ${transaccion.total}` );

  // Función para actualizar el total de un objeto de pago existente o crear uno nuevo
  const actualizarObjetoPago = (nombre, nuevoTotal) => {
      let objetoExistente = localStorage.getItem(nombre);
      if (objetoExistente) {
          objetoExistente = JSON.parse(objetoExistente);
          objetoExistente.total += nuevoTotal;
      } else {
          objetoExistente = { tipo: nombre, total: nuevoTotal };
      }
      localStorage.setItem(nombre, JSON.stringify(objetoExistente));
  };

  // Actualizar o crear objetos de pago según el método seleccionado
  if (transaccion.tipoPago === 'Efectivo') {
      actualizarObjetoPago('Efectivo', transaccion.total);
  } else if (transaccion.tipoPago === 'Tarjeta') {
      actualizarObjetoPago('Tarjeta', transaccion.total);
  } else if (transaccion.tipoPago === 'MercadoPago') {
      actualizarObjetoPago('MercadoPago', transaccion.total);
  }

  // Aquí puedes agregar lógica adicional según el método de pago
  // Por ejemplo, enviar datos de pago a un servidor, mostrar un mensaje, etc.
  // También puedes reiniciar el carrito después del pago si es necesario
  setCarrito([]);
};


  return (
    <div className="container">
    <div className='container-compra'>
      <ListaDeProductos addToCart={addToCart} />
      <Carrito carrito={carrito} removeFromCart={removeFromCart} removeFromCart1={removeFromCart1} />
      </div>
      
      <SumaCarrito carrito={carrito} onPagar={realizarPago} />
      <Footer/>
    
    </div>
  );
};

export default App;
