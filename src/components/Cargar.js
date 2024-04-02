import React, { useState, useEffect } from "react";
import Busqueda from "./busquedaproducto";

function AgregarProducto() {
  const [id, setId] = useState("");
  const [estructura, setEstructura] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [productos, setProductos] = useState([]);
  const [indiceProductoSeleccionado, setIndiceProductoSeleccionado] =
    useState(null);

  const estructuras = [
    " ",
    "Coca-cola",
    "Pepsi",
    "snacks",
    "limpieza",
    "chicles",
    "pañuelos",
    "estructura1",
    "estructura2",
    "estructura3",
    "estructura4",
    "estructura5",
    "estructura6",
    "estructura7",
    "estructura8",
    "estructura9",
    "estructura10",
    "estructura11",
  ];

  useEffect(() => {
    const productosGuardados =
      JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosGuardados);
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleAgregarProducto = (event) => {
    event.preventDefault();
    const nuevoProducto = {
      id,
      estructura,
      descripcion,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad),
    };
    setProductos([...productos, nuevoProducto]);
    guardarProductosEnLocalStorage([...productos, nuevoProducto]);
    setId(""); // Reinicia el campo de entrada de ID
    setEstructura("");
    setDescripcion("");
    setPrecio("");
    setCantidad("");
  };

  const handleChangeSelect = (event) => {
    setIndiceProductoSeleccionado(parseInt(event.target.value, 10));
  };

  const handleEliminarProducto = (event) => {
    event.preventDefault();
    if (indiceProductoSeleccionado !== null) {
      const nuevosProductos = productos.filter(
        (producto, index) => index !== indiceProductoSeleccionado
      );
      setProductos(nuevosProductos);
      guardarProductosEnLocalStorage(nuevosProductos);
      setIndiceProductoSeleccionado(null); // Reiniciar el índice seleccionado después de eliminar
    }
  };

  const guardarProductosEnLocalStorage = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
  };

  return (
    <div className="container-cargar">
    <div className="container-cargar">
      <div className="container">
        <form onSubmit={handleAgregarProducto}>
          <fieldset>
            <legend>Agregar nuevo producto</legend>
            <br />
            <label>
              ID:
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                autoFocus
                required
              />
            </label>
            <br />
            <label>
              Estructura:
              <select
                value={estructura}
                onChange={(e) => setEstructura(e.target.value)}
              >
                {estructuras.map((e, index) => (
                  <option key={index} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Descripción:
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Precio:
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Cantidad:
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Agregar</button>
          </fieldset>
        </form>

        <form onSubmit={handleEliminarProducto}>
          <fieldset>
            <legend>Eliminar producto</legend>
            <label>
              Selecciona un producto:
              <select
                value={
                  indiceProductoSeleccionado !== null
                    ? indiceProductoSeleccionado
                    : ""
                }
                onChange={handleChangeSelect}
              >
                <option value="">Seleccione un producto</option>
                {productos.map((producto, index) => (
                  <option key={index} value={index}>
                    {producto.id}-{producto.descripcion}
                  </option>
                ))}
              </select>
            </label>{" "}
            <br />
            <button type="submit">Eliminar</button>
          </fieldset>
        </form>
        </div>
        <div className="container">
          <Busqueda />
        </div>

        <br />
      
       <div className="container-cargar">
       
        <ul>
        <h2 className="tituloLista">  Lista de productos</h2>
          {productos.map((producto, index) => (
            <li className="itemlista" key={index}>
              <strong>ID:</strong> {producto.id}, <strong>Estructura:</strong>{" "}
              {producto.estructura}, <strong>Descripción:</strong>{" "}
              {producto.descripcion}, <strong>Precio:</strong> {producto.precio}
              , <strong>Cantidad:</strong> {producto.cantidad}
            </li>
          ))}
        </ul>
      </div>
    
    </div>
    </div>
  );
}

export default AgregarProducto;
