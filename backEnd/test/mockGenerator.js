import mongoose from "mongoose";

const generateObjectId = () => new mongoose.Types.ObjectId().toString();

const generateMockPlanilla = (suffix) => ({
  datosPsa: {
    fecha: `2024-06-01`,
    responsable: [generateObjectId()],
    horaIni: `08:00`,
    horaFin: `10:00`,
    cant: `5`,
    tipoControl: [generateObjectId()],
    medioTec: [generateObjectId()],
    tipoPro: [generateObjectId()],
  },
  datosVuelo: {
    codVuelo: [generateObjectId()],
    horaArribo: `12:00`,
    horaPartida: `14:00`,
    demora: [generateObjectId()],
    tipoVuelo: [generateObjectId()],
    matriculaAeronave: [generateObjectId()],
    posicion: `Posicion ${suffix}`,
  },
  datosTerrestre: [
    {
      personalEmpresa: [generateObjectId()],
      funcion: [generateObjectId()],
      grupo: `Grupo ${suffix}`,
    },
  ],
  datosSeguridad: [
    {
      personalSegEmpresa: [generateObjectId()],
      empresaSeguridad: [generateObjectId()],
    },
  ],
  datosVehiculos: [
    {
      vehiculo: [generateObjectId()],
      operadorVehiculo: [generateObjectId()],
      observacionesVehiculo: `ObservacionesVehiculo ${suffix}`,
    },
  ],
  novEquipajes: `NovEquipajes ${suffix}`,
  novInspeccion: `NovInspeccion ${suffix}`,
  novOtras: `NovOtras ${suffix}`,
});

const generateMockOficial = (apellido) => ({
  id: generateObjectId(),
  dni: "35456789",
  firstname: "Roberto",
  lastname: `${apellido}`,
  legajo: 123456,
});

const generateMockPersonalEmpresa = (apellido) => ({
  id: generateObjectId(),
  dni: "35456789",
  firstname: "Roberto",
  lastname: `${apellido}`,
  empresa: { id: generateObjectId(), empresa: `${apellido}EMPRESA` }, // Assuming empresa is now a reference to Empresa model
  legajo: 123456,
});

export {
  generateMockPlanilla,
  generateMockOficial,
  generateMockPersonalEmpresa,
};
