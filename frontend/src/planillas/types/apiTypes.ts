type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  _id: string;
};

export type OficialCommon = {
  dni: number;
  firstName: string;
  lastName: string;
  legajo: number;
};

export type PersonalEmpresaCommon = {
  dni: number;
  firstName: string;
  lastName: string;
  empresa: string;
  legajo: number;
};
export type PersonalSeguridadCommon = {
  dni: number;
  firstName: string;
  lastName: string;
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
