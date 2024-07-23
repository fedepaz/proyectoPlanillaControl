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

export type PersonalEmpresaCommon = {
  _id: string;
  dni: number;
  firstname: string;
  lastname: string;
  empresa: string;
  legajo: number;
};
export type PersonalSeguridadCommon = {
  _id: string;
  dni: number;
  firstname: string;
  lastname: string;
  empresa: string;
  legajo: number;
};

export type ApiCreateEditOficial = OficialCommon & (Create | Edit);
export type ApiCreateEditPersonalEmpresa = PersonalEmpresaCommon &
  (Create | Edit);
export type ApiCreateEditPersonalSeguridad = PersonalSeguridadCommon &
  (Create | Edit);

export type ApiGetOficial = Edit & OficialCommon;
export type ApiGetPersonalEmpresa = Edit & PersonalEmpresaCommon;
export type ApiGetPersonalSeguridad = Edit & PersonalSeguridadCommon;
