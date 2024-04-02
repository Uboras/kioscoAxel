import React from 'react';



class DescargarArchivo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ventasEfectivo: [],
            ventasTarjeta: [],
            ventasMercadoPago: []
        };
        
        this.descargarObjeto = this.descargarObjeto.bind(this);
        this.verVentas = this.verVentas.bind(this);
        this.limpiarStorage = this.limpiarStorage.bind(this);
    }

    componentDidMount() {
        // Obtener las ventas del almacenamiento local al montar el componente
        const ventasEfectivo = JSON.parse(localStorage.getItem('Efectivo')) || [];
        const ventasTarjeta = JSON.parse(localStorage.getItem('Tarjeta')) || [];
        const ventasMercadoPago = JSON.parse(localStorage.getItem('MercadoPago')) || [];
        
        
        this.setState({
            ventasEfectivo,
            ventasTarjeta,
            ventasMercadoPago
        });
    }
    

    descargarObjeto(nombreArchivo) {
        // Recuperar el objeto del almacenamiento local
        let objeto = localStorage.getItem(nombreArchivo);
        if (objeto) {
            // Convertir el objeto a formato JSON
            objeto = JSON.parse(objeto);
            
            // Crear una cadena de texto con cada elemento en una línea separada
            const texto = Object.entries(objeto).map(([clave, valor]) => `${clave}: ${JSON.stringify(valor)}`).join('\n');
    
            // Crear un objeto Blob que representa el contenido del archivo
            const archivoBlob = new Blob([texto], { type: 'text/plain' });
    
            // Crear un elemento <a> para el enlace de descarga
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = URL.createObjectURL(archivoBlob);
            enlaceDescarga.download = `${nombreArchivo}.txt`;
    
            // Simular un clic en el enlace para iniciar la descarga
            enlaceDescarga.click();
        } else {
            alert(`No se encontró Lista de'${nombreArchivo}'.`);
        }
    }
    
    verVentas() {
        // Mostrar en pantalla la información de las ventas
        const { ventasEfectivo, ventasTarjeta, ventasMercadoPago } = this.state;

        alert(`Ventas en Efectivo:\n${JSON.stringify(ventasEfectivo)}\n\nVentas con Tarjeta:\n${JSON.stringify(ventasTarjeta)}\n\nVentas con Mercado Pago:\n${JSON.stringify(ventasMercadoPago)}`);
    }

    limpiarStorage() {
        // Limpiar todos los elementos del almacenamiento local
        localStorage.removeItem('Efectivo');
        localStorage.removeItem('Tarjeta');
        localStorage.removeItem('MercadoPago');
        // Actualizar el estado para reflejar el cambio
        this.setState({
            ventasEfectivo: [],
            ventasTarjeta: [],
            ventasMercadoPago: []
        });
        alert('Se han eliminado todos los elementos del almacenamiento local.');
    }
    render() {
        return (
            <div className='container-reportes'>
                <h4 className='reportes_h2'> Lista de productos</h4>
                <button onClick={() => this.descargarObjeto('productos')}>Descargar lista de productos</button>
                <h4 className='reportes_h2'> Reporte de vendido hoy</h4>
                <button onClick={this.verVentas}>Ver ventas</button>
                <div className='contenedor de descargas'>
                    <h4 className='reportes_h2'>Descarga de archivos</h4>
                    <button onClick={() => this.descargarObjeto('Efectivo')}>Descargar <br/> Efectivo</button>
                    <button onClick={() => this.descargarObjeto('Tarjeta')}>Descargar <br/>Tarjeta</button>
                    <button onClick={() => this.descargarObjeto('MercadoPago')}>Descargar<br/> Mercado Pago</button>
                    <button onClick={() => this.descargarObjeto('VentaDiaria')}>Descargar<br/> ventas Por dia</button>
                </div>
             
              
                <h4 className='reportes_h2'> Reporte de vendido hoy</h4>
<button onClick={this.limpiarStorage}>Limpiar almacenamiento</button>

            </div>
        );
    }
}

export default DescargarArchivo;
