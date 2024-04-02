import React, { useState } from "react";

function ActualizarCantidadProducto() {
  const [id, setId] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleActualizarCantidad = (event) => {
    event.preventDefault();

    // Recuperar la lista de productos del almacenamiento local
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    
    // Buscar el producto en la lista
    const productoExistente = productosGuardados.find((producto) => producto.id === id);

    if (productoExistente) {
      // Si el producto existe, actualiza su cantidad y si la cantidad es vacia. 
      const nuevaCantidad = cantidad !="" ?  productoExistente.cantidad + parseInt(cantidad):  productoExistente.cantidad;

      // Actualizar la lista de productos con la nueva cantidad
      const nuevosProductos = productosGuardados.map((producto) => {
        if (producto.id === id) {
          return { ...producto, cantidad: nuevaCantidad };
        }
        return producto;
      });

      // Guardar la lista actualizada en el almacenamiento local
      localStorage.setItem("productos", JSON.stringify(nuevosProductos));

      // Reinicia los campos de entrada
      setId("");
      setCantidad("");

      // Notificar al usuario que se guardó la actualización
      alert("La cantidad del producto se ha actualizado correctamente.");
    } else {
      // Si el producto no existe, muestra una alerta
      alert(`No se encontró ningún producto con el ID "${id}".`);
    }
  };

  return (
    <div>
      <form onSubmit={handleActualizarCantidad}>
        <fieldset>
          <legend>Actualizar cantidad de producto</legend>
          <br />
          <label>
          Código:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <br />
          <label>
            Cantidad a agregar:
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </label>
          <br />
        </fieldset>
          <button type="submit">Actualizar Cantidad</button>
      </form>
    </div>
  );
}

export default ActualizarCantidadProducto;
