import React, { useState, useEffect } from 'react';

import "../styles/footer.css"

function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const horaActual = currentDateTime.getHours();
    const minutosActual = currentDateTime.getMinutes();
    const segundosActual = currentDateTime.getSeconds();

    if (horaActual === 22 && minutosActual === 17 && segundosActual >= 0 && segundosActual <= 59) {
      guardarVentasDiarias();
    }
  }, [currentDateTime]);

  const guardarVentasDiarias = () => {
    const hora = currentDateTime.getHours();
    const dia = currentDateTime.getDate();
    const mes = currentDateTime.getMonth() + 1;
    const año = currentDateTime.getFullYear();
    const formattedDate = `${hora}-${dia}-${mes}-${año}`;

    const ventasEfectivo = JSON.parse(localStorage.getItem('Efectivo')) || [];
    const ventasTarjeta = JSON.parse(localStorage.getItem('Tarjeta')) || [];
    const ventasMercadoPago = JSON.parse(localStorage.getItem('MercadoPago')) || [];

    // Crear el objeto de venta diaria
    const ventaDiaria = {
      fecha: formattedDate,
      Efectivo: ventasEfectivo,
      Tarjeta: ventasTarjeta,
      MercadoPago: ventasMercadoPago
    };

    // Obtener el objeto de venta diaria existente del localStorage
    let ventaDiariaExistente = JSON.parse(localStorage.getItem('VentaDiaria'));

    // Verificar si ya existe una venta diaria para el día actual
    if (ventaDiariaExistente && ventaDiariaExistente[formattedDate]) {
      // Si existe, agregar los datos nuevos a los existentes
      ventaDiariaExistente[formattedDate] = {
        ...ventaDiariaExistente[formattedDate],
        ...ventaDiaria
      };
    } else {
      // Si no existe, crear una nueva entrada para el día actual
      ventaDiariaExistente = {
        ...ventaDiariaExistente,
        [formattedDate]: ventaDiaria
      };
    }

    // Guardar la venta diaria actualizada en el localStorage
    localStorage.setItem('VentaDiaria', JSON.stringify(ventaDiariaExistente));
  };

  // Función para formatear los datos de ventas diarias
  const formatVentasDiarias = () => {
    const ventaDiariaExistente = JSON.parse(localStorage.getItem('VentaDiaria'));
    let formattedSales = '';

    if (ventaDiariaExistente) {
      Object.keys(ventaDiariaExistente).forEach((key) => {
        const ventaDiaria = ventaDiariaExistente[key];
        const formattedSalesLine = `--Efectivo total: ${ventaDiaria.Efectivo.total} --Tarjeta total: ${ventaDiaria.Tarjeta.total} --MercadoPago total: ${ventaDiaria.MercadoPago.total} \n;`;
        formattedSales += formattedSalesLine;
      });
    }

    return formattedSales;
  };

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = currentDateTime.toLocaleDateString('es-ES', options);
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <footer className="contenedor-footer">
      <p className='contenedor-footer_p'>{formattedDate}</p>
      <p className='contenedor-footer_p'>{formattedTime}</p>
      <p className='contenedor-footer_p'>{formatVentasDiarias()}</p>
    </footer>
  );
}

export default Footer;
