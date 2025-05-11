import { ReactNode } from "react";

export enum UserRole {
  ADMIN = "admin",
  AUXILIAR = "auxiliar",
  RESPONSABLE = "responsable",
  SUPERVISOR = "supervisor",
  OPER_UNIDAD = "operUnidad",
  OPER_REGIONAL = "operRegional",
  OPER_CEAC = "operCeac",
}

export enum UserHierarchy {
  AYUDANTE = "ayudante",
  PRINCIPAL = "principal",
  MAYOR = "mayor",
  JEFE = "jefe",
  SUBINSPECTOR = "subinspector",
  INSPECTOR = "inspector",
  COMISIONADO = "comisionado",
}

export enum ActionCategory {
  MAIN = "main",
  ACCOUNT = "account",
  ADMIN = "admin",
  REPORTS = "reports",
  SETTINGS = "settings",
}

export interface ActionButton {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  primary?: boolean;
  category: ActionCategory;
  allowedRoles: UserRole[];
  description?: string;
  disabled?: boolean;
}

export function hasPermission(
  userRole: UserRole,
  allowedRoles: UserRole[]
): boolean {
  return allowedRoles.includes(userRole);
}

export const RolePermissions = {
  ADMIN_ONLY: [UserRole.ADMIN],
  AUXILIAR_ONLY: [UserRole.AUXILIAR],
  RESPONSABLE_ONLY: [UserRole.RESPONSABLE],
  SUPERVISOR_ONLY: [UserRole.SUPERVISOR],
  OPER_UNIDAD_ONLY: [UserRole.OPER_UNIDAD],
  OPER_REGIONAL_ONLY: [UserRole.OPER_REGIONAL],
  OPER_CEAC_ONLY: [UserRole.OPER_CEAC],
  ALL: Object.values(UserRole),
};
