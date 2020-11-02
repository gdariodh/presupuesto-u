import React, { Fragment, useState } from "react";
import PropTypes from 'prop-types';
import Error from "./Error";
import shortid from 'shortid';

const Formulario = ({guardarGasto,guardarCrearGasto}) => {
  const [nombre, actualizarNombre] = useState("");
  const [cantidad, actualizarCantidad] = useState(0);
  const [error, actualizarError] = useState(false);
  // Cuando se agrega el gasto para luego plasmarlo en el app.js
  const agregarGasto = (e) => {
    e.preventDefault();

    // validar datos
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
      actualizarError(true);
      return;
    }

    // si pasa la validacion
    actualizarError(false);

    // construir gasto
    const gasto = {
        nombre,
        cantidad,
        id: shortid.generate()
    }

    // pasar el gasto al componente principal app.js
    guardarGasto(gasto);
    guardarCrearGasto(true);

    // resetear form
    actualizarNombre('');
    actualizarCantidad(0);
  };

  return (
    <Fragment>
      <h2>Agrega tus gastos aqui!</h2>

      {error ? (
        <Error mensaje='Los campos son obligatorios o presupuesto incorrecto!' />
      ) : null}

      <form onSubmit={agregarGasto}>
        <div className='campo'>
          <label>Nombre del gasto</label>
          <input
            type='text'
            className='u-full-width'
            placeholder='Ej. Transporte'
            value={nombre}
            onChange={(e) => actualizarNombre(e.target.value)}
          />
        </div>
        <div className='campo'>
          <label>Gasto</label>
          <input
            type='number'
            className='u-full-width'
            placeholder='Ej. 300'
            value={cantidad}
            onChange={(e) => actualizarCantidad(parseInt(e.target.value, 10))}
          />
        </div>

        <input
          type='submit'
          className='button-primary u-full-width'
          value='Agregar Gasto'
        />
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  guardarGasto : PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;
