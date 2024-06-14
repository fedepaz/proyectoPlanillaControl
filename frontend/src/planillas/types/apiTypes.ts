type Create = {
  variant: "create";
};

type Edit = {
  variant: "edit";
  _id: string;
};

type OficialCommon = {
  _id: string;
  firstName: string;
  lastName: string;
  legajo: number;
};

type PersonalEmpresaCommon = {
  _id: string;
  firstName: string;
  lastName: string;
  empresa: string;
  legajo: number;
};
type PersonalSeguridadCommon = {
  _id: string;
  firstName: string;
  lastName: string;
  empresa: string;
  legajo: number;
};
