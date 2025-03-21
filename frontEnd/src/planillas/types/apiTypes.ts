type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  id: string;
};

export type OficialCommon = {
  id: string;
  dni: string;
  firstname: string;
  lastname: string;
  legajo: string;
};

export type ApiCreateEditOficial = OficialCommon & (Create | Edit);
export type ApiGetOficial = Edit & OficialCommon;

export type PersonalEmpresaCommon = {
  id: string;
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
  id: string;
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
  id: string;
  empresa: string;
  tipoEmpresa: string;
};

export type ApiCreateEditEmpresa = EmpresaCommon & (Create | Edit);
export type ApiGetEmpresa = Edit & EmpresaCommon;

export type MatriculaAeronaveCommon = {
  id: string;
  matriculaAeronave: string;
  empresa: string;
};

export type ApiCreateEditMatriculaAeronave = MatriculaAeronaveCommon &
  (Create | Edit);
export type ApiGetMatriculaAeronave = Edit & MatriculaAeronaveCommon;

export type AeropuertoCommon = {
  id: string;
  aeropuerto: string;
  codIATA: string;
  codOACI: string;
};

export type ApiCreateEditAeropuerto = AeropuertoCommon & (Create | Edit);
export type ApiGetAeropuerto = Edit & AeropuertoCommon;

export type VehiculosCommon = {
  id: string;
  tipoVehiculo: string;
  empresa: string;
  numInterno: string;
};

export type ApiCreateEditVehiculos = VehiculosCommon & (Create | Edit);
export type ApiGetVehiculos = Edit & VehiculosCommon;

export type CodVuelosCommon = {
  id: string;
  codVuelo: string;
  origen: string;
  destino: string;
  empresa: string;
};

export type ApiCreateEditCodVuelos = CodVuelosCommon & (Create | Edit);
export type ApiGetCodVuelos = Edit & CodVuelosCommon;
