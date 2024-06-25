function generateMockPlanilla(lastname) {
  return {
    datosPsa: {
      fecha: "2024-01-01",
      responsable: `Oficial ${lastname}`,
      horaIni: "08:00",
      horaFin: "16:00",
      cant: "10",
      tipoControl: "Routine",
      medioTec: "X-ray",
      tipoPro: "Standard",
    },
    datosVuelo: {
      aerolinea: "Airline XYZ",
      codVuelo: "XYZ123",
      origen: "JFK",
      destino: "LAX",
      horaArribo: "10:00",
      horaPartida: "12:00",
      demora: "0",
      tipoVuelo: "Commercial",
      matriculaAeronave: "ABC123",
      posicion: "Gate 5",
    },
    datosTerrestre: [
      {
        apellidoTerrestre: "Doe",
        nombreTerrestre: "Jane",
        dniTerrestre: "12345678",
        legajoTerrestre: "87654321",
        funcion: "Operator",
        grupo: "A",
      },
    ],
    datosSeguridad: [
      {
        apellidoSeguridad: "Smith",
        nombreSeguridad: "John",
        dniSeguridad: "87654321",
        legajoSeguridad: "12345678",
        empresaSeguridad: "Security Inc",
      },
    ],
    datosVehiculos: [
      {
        tipoVehiculo: "Truck",
        empresaVehiculo: "Transport LLC",
        numInterno: "987654",
        operadorVehiculo: "Jake",
        observacionesVehiculo: "None",
      },
    ],
    novEquipajes: "None",
    novInspeccion: "None",
    novOtras: "None",
  };
}

export { generateMockPlanilla };
