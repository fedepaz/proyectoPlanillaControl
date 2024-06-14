type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  _id: string;
};

export type OficialCommon = {
  _id: string;
  firstName: string;
  lastName: string;
  legajo: number;
  dni: number;
};

export type PersonalEmpresaCommon = {
  _id: string;
  firstName: string;
  lastName: string;
  empresa: string;
  dni: number;
  legajo: number;
};
export type PersonalSeguridadCommon = {
  _id: string;
  firstName: string;
  lastName: string;
  empresa: string;
  dni: number;
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
