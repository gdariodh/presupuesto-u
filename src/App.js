import React, { Fragment, useState, useEffect } from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  // states que van de la mano con el useEffect
  const [gasto, guardarGasto] = useState({});
  const [creargasto, guardarCrearGasto] = useState(false);

  // usamos useEffect para manipular el presupuesto y el restante - se remplaza la expression agregarNuevoGasto
  useEffect(() => {
    // agrega un nuevo gasto
    if (creargasto) {
      guardarGastos([...gastos, gasto]);

      // restar el presupuesto con los nuevos gastos!
      const prepuestoRestante = restante - gasto.cantidad;
      guardarRestante(prepuestoRestante);

      // resetar
      guardarCrearGasto(false);
    }
  }, [gasto,creargasto,restante,gastos]);

  /* Se ejecuta cuando se agrega un nuevo gasto! - Funcion anterior, sustuida por useEffect
  const agregarNuevoGasto = gasto => {
    // Esto nos funcionara para listar - ...gastos hara que se vayan listado el anterior con el nuevo objeto
    guardarGastos([
      ...gastos, gasto
    ]);
  }*/

  return (
    <Fragment>
      <div className='container'>
        <header>
          <h1>Presupuesto semanal</h1>

          <div className='contenido-principal contenido'>
            {mostrarpregunta ? (
              <Pregunta
                guardarPresupuesto={guardarPresupuesto}
                guardarRestante={guardarRestante}
                actualizarPregunta={actualizarPregunta}
              />
            ) : (
              <div className='row'>
                <div className='one-half column'>
                  <Formulario
                    guardarGasto={guardarGasto}
                    guardarCrearGasto={guardarCrearGasto}
                  />
                </div>

                <div className='one-half column'>
                  <Listado gastos={gastos} />

                  <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                  />
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
    </Fragment>
  );
}

export default App;
