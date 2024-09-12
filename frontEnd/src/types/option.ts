export type Option = { _id: string; label: string };
export type OficialOption = {
  _id: string;
  dni: string;
  firstname: string;
  lastname: string;
  legajo: string;
};
export type MatriculaOption = {
  _id: string;
  matriculaAeronave: string;
  empresa: string;
};

export type EmpresaOption = {
  id: string;
  empresa: string;
  tipoEmpresa: string;
};

export type PlanillaOption = {
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
    tipoVuelo: string;
    matriculaAeronave: string;
    posicion: string;
  };
  datosTerrestre: Array<{
    dniTerrestre: string;
    apellidoTerrestre: string;
    nombreTerrestre: string;
    legajoTerrestre: string;
    funcion: string;
    grupo: string;
  }>;
  datosSeguridad: Array<{
    apellidoSeguridad: string;
    nombreSeguridad: string;
    dniSeguridad: string;
    legajoSeguridad: string;
    empresaSeguridad: string;
  }>;
  datosVehiculos: Array<{
    tipoVehiculo: string;
    empresaVehiculo: string;
    numInterno: string;
    operadorVehiculo: string;
    observacionesVehiculo: string;
  }>;
  novEquipajes: string;
  novInspeccion: string;
  novOtras: string;
};
