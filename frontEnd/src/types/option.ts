import { UserHierarchy } from "../actions/types";

export type Option = {
  label: string;
  id: string;
};

export type OficialOption = {
  id: string;
  dni: string;
  firstname: string;
  lastname: string;
  legajo: string;
};
export type MatriculaOption = {
  id: string;
  matriculaAeronave: string;
  empresa: string;
};

export type EmpresaOption = {
  id: string;
  empresa: string;
};

export type UnidadOption = {
  id: string;
  aeropuerto: string;
  codIATA: string;
  codOACI: string;
};
export type AeropuertoOption = {
  id: string;
  aeropuerto: string;
  codIATA: string;
  codOACI: string;
};

export type JerarquiaOption = {
  id: string;
  label: UserHierarchy;
};

export type PlanillaOption = {
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
