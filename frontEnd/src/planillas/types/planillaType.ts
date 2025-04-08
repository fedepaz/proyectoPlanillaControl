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
    aerolinea: string;
    codVuelo: string;
    origen: string;
    destino: string;
    horaArribo: string;
    horaPartida: string;
    demora: string;
    tipoVuelo: string;
    matriculaAeronave: string;
    posicion: string;
  };
  datosTerrestre: {
    apellidoTerrestre: string;
    nombreTerrestre: string;
    dniTerrestre: number;
    legajoTerrestre: number;
    funcion: string;
    grupo: number;
  }[];
  datosSeguridad: {
    apellidoSeguridad: string;
    nombreSeguridad: string;
    dniSeguridad: string;
    legajoSeguridad: string;
    empresaSeguridad: string;
  }[];
  datosVehiculos: {
    tipoVehiculo: string;
    empresaVehiculo: string;
    numInterno: string;
    operadorVehiculo: string;
    observacionesVehiculo: string;
  }[];
  novEquipajes: string;
  novInspeccion: string;
  novOtras: string;
};

export type PlanillaCreateEdit = PlanillaCommon & (Create | Edit);

export type PlanillaGet = Edit & PlanillaCommon;
