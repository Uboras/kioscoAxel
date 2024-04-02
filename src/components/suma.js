import React, { useState } from "react";
import "../styles/suma.css";

const SumaCarrito = ({ carrito, onPagar }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const total = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  const dineroEntregado = parseFloat(inputValue) || 0;

  const handlePago = (tipoPago) => {
    // Restar las unidades vendidas de los productos en el almacenamiento local
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    const nuevosProductos = productosGuardados.map((producto) => {
      const productoEnCarrito = carrito.find((p) => p.id === producto.id);
      if (productoEnCarrito) {
        const unidadesVendidas = productoEnCarrito.cantidad;
        return {
          ...producto,
          cantidad: producto.cantidad - unidadesVendidas
        };
      }
      return producto;
    });

    // Actualizar los productos en el almacenamiento local
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));

    // Llamar a la función de pago pasando el tipo de pago y el total
    onPagar({ tipoPago, total });

    // Limpiar el carrito
    setInputValue("");
  };

  return (
    <div className="container-total">
      <h2>Total del Carrito</h2>
      <p>Total: ${total}</p>
      <p>Paga con:</p>
      <div className="container-total_pagos">
        <label htmlFor="input-total">¿Cuánto dinero te Entregan?</label>
        <br />
        <input
          id="input-total"
          type="number"
          className="container-total_pagos-efectivo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <p>
          {dineroEntregado !== 0
            ? dineroEntregado == total
              ? `Pago Exácto`
              : dineroEntregado - total <= 0
              ? `Faltan ${total - dineroEntregado} que te den`
              : `El vuelto es de ${dineroEntregado - total}`
            : 0}
        </p>
        <button onClick={() => handlePago("Efectivo")}>Efectivo</button>
        <button onClick={() => handlePago("MercadoPago")}>Mercado Pago</button>
        <button onClick={() => handlePago("Tarjeta")}>Tarjeta</button>
      </div>
    </div>
  );
};

export default SumaCarrito;
