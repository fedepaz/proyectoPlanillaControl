import { UserHierarchy } from "../actions/types";

export type Option = {
  label: string;
  id: string;
};

export type OficialOption = {
  id: string;
  dni: number;
  firstname: string;
  lastname: string;
  legajo: number;
};

export type BasePersonalOption = {
  id: string;
  dni: string;
  firstname: string;
  lastname: string;
  empresa: EmpresaOption;
  legajo: string;
  isUserCreated?: boolean;
  createdAt?: string;
  needsValidation?: boolean;
};

export type PersonalEmpresaOption = BasePersonalOption;

export type PersonalSeguridadOption = BasePersonalOption;

export type MatriculaOption = {
  id: string;
  matriculaAeronave: string;
  empresaId: string;
  isUserCreated?: boolean;
  createdAt?: string;
  needsValidation?: boolean;
};

export type EmpresaOption = {
  id: string;
  empresa: string;
  isUserCreated?: boolean;
  createdAt?: string;
  needsValidation?: boolean;
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
  codOACI?: string;
  isUserCreated?: boolean;
  createdAt?: string;
  needsValidation?: boolean;
};

export type CodVueloOption = {
  id: string;
  codVuelo: string;
  origen: AeropuertoOption;
  destino: AeropuertoOption;
  empresa: EmpresaOption;
  isUserCreated?: boolean;
  createdAt?: string;
  needsValidation?: boolean;
};

export type JerarquiaOption = {
  id: string;
  label: UserHierarchy;
};

export type VehiculoOption = {
  id: string;
  tipoVehiculo: {
    id: string;
    label: string;
  };
  empresa: EmpresaOption | string;
  numInterno: string;
  isUserCreated?: boolean;
  createdAt?: string;
  needsValidation?: boolean;
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
