const generateMockPlanilla = (suffix) => ({
  datosPsa: {
    fecha: `2024-06-01`,
    responsable: `Responsable ${suffix}`,
    horaIni: `08:00`,
    horaFin: `10:00`,
    cant: `5`,
    tipoControl: "Personas",
    medioTec: "Otros",
    tipoPro: "Rutina",
  },
  datosVuelo: {
    aerolinea: `Aerolinea ${suffix}`,
    codVuelo: `CodVuelo ${suffix}`,
    origen: `Origen ${suffix}`,
    destino: `Destino ${suffix}`,
    horaArribo: `12:00`,
    horaPartida: `14:00`,
    demora: "NO",
    tipoVuelo: "Arribo",
    matriculaAeronave: `MatriculaAeronave ${suffix}`,
    posicion: `Posicion ${suffix}`,
  },
  datosTerrestre: [
    {
      apellidoTerrestre: `ApellidoTerrestre ${suffix}`,
      nombreTerrestre: `NombreTerrestre ${suffix}`,
      dniTerrestre: `DniTerrestre ${suffix}`,
      legajoTerrestre: `LegajoTerrestre ${suffix}`,
      funcion: "Otro",
      grupo: `Grupo ${suffix}`,
    },
  ],
  datosSeguridad: [
    {
      apellidoSeguridad: `ApellidoSeguridad ${suffix}`,
      nombreSeguridad: `NombreSeguridad ${suffix}`,
      dniSeguridad: `DniSeguridad ${suffix}`,
      legajoSeguridad: `LegajoSeguridad ${suffix}`,
      empresaSeguridad: `EmpresaSeguridad ${suffix}`,
    },
  ],
  datosVehiculos: [
    {
      tipoVehiculo: `TipoVehiculo ${suffix}`,
      empresaVehiculo: `EmpresaVehiculo ${suffix}`,
      numInterno: `NumInterno ${suffix}`,
      operadorVehiculo: `OperadorVehiculo ${suffix}`,
      observacionesVehiculo: `ObservacionesVehiculo ${suffix}`,
    },
  ],
  novEquipajes: `NovEquipajes ${suffix}`,
  novInspeccion: `NovInspeccion ${suffix}`,
  novOtras: `NovOtras ${suffix}`,
});

const generateMockOficial = (apellido) => ({
  dni: "35456789",
  firstname: "Roberto",
  lastname: `${apellido}`,
  legajo: 123456,
});

export { generateMockPlanilla, generateMockOficial };
