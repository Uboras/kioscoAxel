import React from "react";

class EnviarWhatsapp extends React.Component {
    constructor(props) {
      super(props);
      this.enviarMensaje = this.enviarMensaje.bind(this);
    }
  
    enviarMensaje(ventasEfectivo, ventasTarjeta, ventasMercadoPago) {
      // Número de teléfono al que se enviará el mensaje
      const numero = "+5491126376023";
  
      // Mensaje que se enviará
      const mensaje =  `Ventas en Efectivo:\n${JSON.stringify(ventasEfectivo)}\n\nVentas con Tarjeta:\n${JSON.stringify(
        ventasTarjeta)}\n\nVentas con Mercado Pago:\n${JSON.stringify(ventasMercadoPago)}`;
  
      // Crear el enlace con el protocolo "whatsapp://send"
      const enlace = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
  
      // Redirigir al enlace para abrir WhatsApp y enviar el mensaje
      window.location.href = enlace;
    }
    render() {
        return (
          <div>
            <button onClick={this.enviarMensaje}>Enviar mensaje de WhatsApp</button>
          </div>
        );
      }
    }
    
    export default EnviarWhatsapp;