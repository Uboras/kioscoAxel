import React, { useState } from "react";
import ActualizarCantidad from "./ActualizarCantidad";
import BusquedaProducto from "./busquedaproducto";

function Actualizar() {
  const [id, setId] = useState("");
  const [estructura, setEstructura] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [codigo, setCodigo] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmitPorEstructura = (event) => {
    event.preventDefault();
  
    // Verificar si el porcentaje es un número entero positivo
    if (!/^\d+$/.test(porcentaje) || parseInt(porcentaje) < 0) {
      alert("El porcentaje debe ser un número entero positivo.");
      return;
    }
  
    // Recuperar la lista de productos del almacenamiento local
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
  
    // Calcular el factor de aumento del precio (1 + porcentaje / 100)
    const factorAumento = 1 + parseInt(porcentaje) / 100;
  
    // Actualizar los productos que coincidan con la estructura deseada
    const nuevosProductos = productosGuardados.map((producto) => {
      if (producto.estructura === estructura) {
        // Calcular el nuevo precio aumentado por el porcentaje
        const nuevoPrecio = parseFloat(producto.precio) * factorAumento;
        // Devolver una copia del producto con el nuevo precio
        return { ...producto, precio: nuevoPrecio };
      }
      // Para los productos que no coinciden, devolverlos sin cambios
      return producto;
    });
  
    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
  
    // Notificar al usuario que se realizó la actualización
    alert("Los productos han sido actualizados correctamente.");
  };
  
  const handleSubmitSinEstructura = (event) => {
    event.preventDefault();

    actualizarProductoSinEstructura(id, parseFloat(precio));
    alert("Producto actualizado:");
  };

  const estructuras = [' ','Coca-cola','Pepsi','snacks','limpieza','chicles','pañuelos','estructura1',
                        'estructura2','estructura3','estructura4','estructura5','estructura6',
                        'estructura7','estructura8','estructura9','estructura10','estructura11'];

  const actualizarProductoPorEstructura = (estructura, nuevoPrecio) => {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
      const productos = JSON.parse(productosGuardados);
      const productoIndex = productos.findIndex(producto => producto.estructura === estructura);

      if (productoIndex !== -1) {
        productos[productoIndex] = {
          ...productos[productoIndex],
          precio: nuevoPrecio
        };
        localStorage.setItem("productos", JSON.stringify(productos));
        console.log("Producto actualizado:", productos[productoIndex]);
      } else {
        alert(`No se encontró ningún producto con la estructura "${estructura}".`);
      }
    } else {
      alert("No se encontraron productos en el almacenamiento.");
    }
  };

  const actualizarProductoSinEstructura = (id, nuevoPrecio) => {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
      const productos = JSON.parse(productosGuardados);
      const productoIndex = productos.findIndex(producto => producto.id === id);

      if (productoIndex !== -1) {
        productos[productoIndex] = {
          ...productos[productoIndex],
          precio: nuevoPrecio
        };
        localStorage.setItem("productos", JSON.stringify(productos));
        console.log("Producto actualizado:", productos[productoIndex]);
      } else {
        alert(`No se encontró ningún producto con el ID "${id}".`);
      }
    } else {
      alert("No se encontraron productos en el almacenamiento.");
    }
  };

  return (
    <div className="">
    <div className="container-Actualizar">
      <div>
        <form onSubmit={handleSubmitPorEstructura}>
         <fieldset>
          <legend>Actualizar producto con estructura</legend>
          <br />
          Estructura:
          <select value={estructura} onChange={(e) => setEstructura(e.target.value)}>
            {estructuras.map((e, index) => (
              <option key={index} value={e}>{e}</option>
            ))}
          </select>
          <br />
          <label>
            Porcentaje: 
            <input className="input-pequeno"
              type="number"
              value={porcentaje}
              onChange={(e) => setPorcentaje(e.target.value)}
            /> % 
          </label>
        
          </fieldset>
          <button type="submit">Actualizar</button>
        </form>
      </div>

      <div>
        <form onSubmit={handleSubmitSinEstructura}>
          <fieldset>
            <legend>Actualizar producto sin estructura</legend>
            
            <label>
              Código:
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </label><br/>
            
            <label>
              Nuevo precio:
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </label>
          </fieldset>
          
          <button type="submit">Actualizar</button>
        </form>
      </div>
    <ActualizarCantidad></ActualizarCantidad>
    </div>
    <div className="container-Actualizar">
    <BusquedaProducto/>
    
    </div>
    </div>
  );
}

export default Actualizar;
