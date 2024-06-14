type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  _id: string;
};

export type PlanillaCommon = {
  _id: string;
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
    tipo: string;
    matriculaAeronave: string;
    posicion: string;
  };
  datosTerrestre: {
    apellidoTerrestre: string;
    nombreTerrestre: string;
    dniTerrestre: string;
    legajoTerrestre: string;
    funcion: string;
    grupo: string;
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
