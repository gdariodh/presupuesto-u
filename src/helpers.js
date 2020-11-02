export const revisarPresupuesto = (presupuesto, restante) => {
  let clase;

  // 75%
  if (presupuesto / 4 > restante) {
    clase = "alert alert-danger";
  } else if (presupuesto / 2 > restante) {
    clase = "alert alert-warning"; // 50%
  } else {
    // es menor a 50 y 75%
    clase = "alert alert-success";
  }

  return clase;
};
