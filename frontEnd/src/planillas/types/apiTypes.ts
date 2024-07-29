type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  _id: string;
};

export type OficialCommon = {
  _id: string;
  dni: number;
  firstname: string;
  lastname: string;
  legajo: number;
};

export type ApiCreateEditOficial = OficialCommon & (Create | Edit);
export type ApiGetOficial = Edit & OficialCommon;

export type PersonalEmpresaCommon = {
  _id: string;
  dni: number;
  firstname: string;
  lastname: string;
  empresa: string;
  legajo: number;
};

export type ApiCreateEditPersonalEmpresa = PersonalEmpresaCommon &
  (Create | Edit);
export type ApiGetPersonalEmpresa = Edit & PersonalEmpresaCommon;

export type PersonalSeguridadCommon = {
  _id: string;
  dni: number;
  firstname: string;
  lastname: string;
  empresa: string;
  legajo: number;
};

export type ApiCreateEditPersonalSeguridad = PersonalSeguridadCommon &
  (Create | Edit);
export type ApiGetPersonalSeguridad = Edit & PersonalSeguridadCommon;

export type EmpresaCommon = {
  _id: string;
  empresa: string;
};

export type ApiCreateEditEmpresa = EmpresaCommon & (Create | Edit);
export type ApiGetEmpresa = Edit & EmpresaCommon;

export type MatriculaAeronaveCommon = {
  _id: string;
  matriculaAeronave: string;
  empresa: string;
};

export type ApiCreateEditMatriculaAeronave = MatriculaAeronaveCommon &
  (Create | Edit);
export type ApiGetMatriculaAeronave = Edit & MatriculaAeronaveCommon;

export type AeropuertoCommon = {
  _id: string;
  aeropuerto: string;
  codIATA: string;
  codOACI: string;
};

export type ApiCreateEditAeropuerto = AeropuertoCommon & (Create | Edit);
export type ApiGetAeropuerto = Edit & AeropuertoCommon;

export type VehiculosCommon = {
  _id: string;
  tipoVehiculo: string;
  empresa: string;
  numInterno: string;
};

export type ApiCreateEditVehiculos = VehiculosCommon & (Create | Edit);
export type ApiGetVehiculos = Edit & VehiculosCommon;

export type CodVuelosCommon = {
  _id: string;
  codVuelo: string;
  origen: string;
  destino: string;
  empresa: string;
};

export type ApiCreateEditCodVuelos = CodVuelosCommon & (Create | Edit);
export type ApiGetCodVuelos = Edit & CodVuelosCommon;
