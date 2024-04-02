// src/components/VentasComponent.js
import React, { useState, useEffect } from 'react';

const VentasComponent = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [medioDePago, setMedioDePago] = useState('');
  const [ordenFinalizada, setOrdenFinalizada] = useState(false);

  useEffect(() => {
    // Obtener la lista de productos desde el backend al cargar la página
    fetch('http://localhost:3001/api/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener productos:', error));
  }, []);

  const handleAgregarAlCarrito = (productId) => {
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find((p) => p.id === productId);

    if (productoEnCarrito) {
      // Incrementar la cantidad si el producto ya está en el carrito
      setCarrito(
        carrito.map((p) =>
          p.id === productId ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      // Agregar el producto al carrito con cantidad 1 si no está en el carrito
      const producto = productos.find((p) => p.id === productId);
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const handleSeleccionarMedioDePago = (medioPago) => {
    setMedioDePago(medioPago);
  };

  const handleFinalizarCompra = () => {
    // Aquí podrías enviar una solicitud al servidor para registrar la compra
    // y proporcionar la información necesaria para procesar el pago.

    // Después de finalizar la compra, podrías limpiar el carrito y marcar la orden como finalizada
    setCarrito([]);
    setOrdenFinalizada(true);
  };

  return (
    <div>
      <h1>App de Ventas</h1>
      <h2>Productos Disponibles</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => handleAgregarAlCarrito(producto.id)}>
              Agregar al Carrito
            </button>
          </li>
        ))}
      </ul>
      <h2>Carrito de Compras</h2>
      <ul>
        {carrito.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio} - Cantidad: {producto.cantidad}
          </li>
        ))}
      </ul>
      <h2>Seleccionar Medio de Pago</h2>
      <div>
        <label>
          <input
            type="radio"
            name="medioDePago"
            value="tarjeta"
            onChange={() => handleSeleccionarMedioDePago('tarjeta')}
            checked={medioDePago === 'tarjeta'}
          />
          Tarjeta de Crédito
        </label>
        <label>
          <input
            type="radio"
            name="medioDePago"
            value="efectivo"
            onChange={() => handleSeleccionarMedioDePago('efectivo')}
            checked={medioDePago === 'efectivo'}
          />
          Pago en Efectivo
        </label>
      </div>
      <button onClick={handleFinalizarCompra} disabled={carrito.length === 0}>
        Finalizar Compra
      </button>
      {ordenFinalizada && <p>¡Compra finalizada con éxito!</p>}
    </div>
  );
};

export default VentasComponent;
