type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  id: string;
};

export type PlanillaCommon = {
  id: string;
  datosPsa: {
    fecha: string;
    responsable: string;
    horaIni: string;
    horaFin: string;
    cant: string;
    tipoControl: string;
    medioTec: string;
    tipoPro: string;
  };
  datosVuelo: {
    empresa: string;
    codVuelo: string;
    horaArribo: string;
    horaPartida: string;
    demora: string;
    tipoVuelo: string;
    matriculaAeronave: string;
    posicion: string;
  };
  datosTerrestre: {
    personalEmpresa: string[];
    funcion: string;
    grupo: string;
  }[];
  datosSeguridad: {
    personalSegEmpresa: string[];
    empresaSeguridad: string;
  }[];
  datosVehiculos: {
    vehiculo: string;
    operadorVehiculo: string;
    observacionesVehiculo: string;
  }[];
  novEquipajes: string;
  novInspeccion: string;
  novOtras: string;
};

export type PlanillaCreateEdit = PlanillaCommon & (Create | Edit);

export type PlanillaGet = Edit & PlanillaCommon;
