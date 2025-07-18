export const getPopulateFields = (fields = []) => {
  const allFields = {
    responsable: { path: "datosPsa.responsable", select: "firstname lastname" },

    empresa: { path: "datosVuelo.empresa", select: "empresa" },
    codVuelo: {
      path: "datosVuelo.codVuelo",
      select: "codVuelo",
    },
    demora: { path: "datosVuelo.demora", select: "label" },
    tipoVuelo: { path: "datosVuelo.tipoVuelo", select: "label" },
    matriculaAeronave: {
      path: "datosVuelo.matriculaAeronave",
      select: "matriculaAeronave",
    },
    personalEmpresa: {
      path: "datosTerrestre.personalEmpresa",
      select: "firstname lastname dni",
    },
    funcion: { path: "datosTerrestre.funcion", select: "label" },
    personalSegEmpresa: {
      path: "datosSeguridad.personalSegEmpresa",
      select: "firstname lastname dni",
    },
    empresaSeguridad: {
      path: "datosSeguridad.empresaSeguridad",
      select: "nombre",
    },
    vehiculo: { path: "datosVehiculos.vehiculo", select: "matricula" },
    operadorVehiculo: {
      path: "datosVehiculos.operadorVehiculo",
      select: "firstname lastname",
    },
  };
  return fields.filter((key) => allFields[key]).map((key) => allFields[key]);
};
