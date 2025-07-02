type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  id: string;
};

export interface NovedadesData {
  isRequired: boolean;
  observaciones: string;
}

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
    isObservaciones: boolean;
    observacionesVehiculo: string;
  }[];
  novEquipajes: NovedadesData;
  novInspeccion: NovedadesData;
  novOtras: NovedadesData;
};

export type PlanillaCreateEdit = PlanillaCommon & (Create | Edit);

export type PlanillaGet = Edit & PlanillaCommon;
