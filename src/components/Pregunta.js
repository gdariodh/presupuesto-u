import React, { Fragment, useState } from "react";
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({guardarPresupuesto,guardarRestante,actualizarPregunta}) => {
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

// modificar el state cantidad!
  const agregarPresupuesto = (e) => {
    guardarCantidad(parseInt(e.target.value));
  };

  // formulario enviado!
  const enviarPresupuesto = (e) => {
    e.preventDefault();

    // validar
    if (cantidad < 1 || isNaN(cantidad)) {
      guardarError(true);
      return;
    }
    // si pasa la validacion
    guardarError(false);

    //pasar la cantidad a los states globales de app.js
    guardarPresupuesto(cantidad);
    guardarRestante(cantidad);
    // para ocultar mensaje de pregunta
    actualizarPregunta(false); // para usar condicional ternario en app.js
  };

  return (
    <Fragment>
      <h2>Coloca tu presupuesto</h2>
      {
          error ? <Error mensaje="El Presupuesto es incorrecto!"/>: null 
      }

      <form onSubmit={enviarPresupuesto}>
        <input
          type='number'
          className='u-full-width'
          placeholder='Ingresa un presupuesto'
          onChange={agregarPresupuesto}
        />
        <input
          type='submit'
          className='button-primary u-full-width'
          value='Enviar'
        />
      </form>
    </Fragment>
  );
};

Pregunta.propTypes = {
  guardarPresupuesto : PropTypes.func.isRequired,
  guardarRestante: PropTypes.func.isRequired,
  actualizarPregunta: PropTypes.func.isRequired
}

export default Pregunta;
