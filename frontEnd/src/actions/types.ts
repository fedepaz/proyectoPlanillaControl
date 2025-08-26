import { ReactNode } from "react";

export enum UserRole {
  ADMIN = "admin",
  AUXILIAR = "auxiliar",
  RESPONSABLE = "responsable",
  SUPERVISOR = "supervisor",
  OPER_UNIDAD = "operUnidad",
  ICIA_UNIDAD = "iciaUnidad",
  OPER_REGIONAL = "operRegional",
  ICIA_REGIONAL = "iciaRegional",
  OPER_CEAC = "operCeac",
  ICIA_CEAC = "iciaCeac",
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

export interface User {
  role: UserRole;
  hierarchy?: UserHierarchy;
}

//const HIERARCHY_LEVELS = {
//  [UserHierarchy.AYUDANTE]: 1,
//  [UserHierarchy.PRINCIPAL]: 2,
//  [UserHierarchy.MAYOR]: 3,
//  [UserHierarchy.JEFE]: 4,
//  [UserHierarchy.SUBINSPECTOR]: 5,
//  [UserHierarchy.INSPECTOR]: 6,
//  [UserHierarchy.COMISIONADO]: 7,
//};

const HIERARCHY_ROLES_OVERRIDES: Record<UserHierarchy, UserRole[]> = {
  [UserHierarchy.AYUDANTE]: [],
  [UserHierarchy.PRINCIPAL]: [UserRole.RESPONSABLE],
  [UserHierarchy.MAYOR]: [UserRole.SUPERVISOR],
  [UserHierarchy.JEFE]: [UserRole.SUPERVISOR, UserRole.OPER_UNIDAD],
  [UserHierarchy.SUBINSPECTOR]: [UserRole.OPER_UNIDAD],
  [UserHierarchy.INSPECTOR]: [UserRole.OPER_REGIONAL],
  [UserHierarchy.COMISIONADO]: [UserRole.OPER_CEAC],
};

export function getEffectiveRoles(user: User): UserRole[] {
  const effectiveRoles = [user.role];

  if (user.hierarchy && HIERARCHY_ROLES_OVERRIDES[user.hierarchy]) {
    const additionalRoles = HIERARCHY_ROLES_OVERRIDES[user.hierarchy];
    additionalRoles.forEach((role) => {
      if (!effectiveRoles.includes(role)) {
        effectiveRoles.push(role);
      }
    });
  }

  return effectiveRoles;
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

export function hasPermission(user: User, allowedRoles: UserRole[]): boolean {
  const effectiveRoles = getEffectiveRoles(user);
  return effectiveRoles.some((role) => allowedRoles.includes(role));
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

export function checkUserAccess(
  user: User,
  requiredPermissions: UserRole[]
): {
  hasAccess: boolean;
  reason: string;
} {
  const hasAccess = hasPermission(user, requiredPermissions);
  if (hasAccess) {
    const effectiveRoles = getEffectiveRoles(user);
    const matchingRole = effectiveRoles.find((role) =>
      requiredPermissions.includes(role)
    );
    return {
      hasAccess: true,
      reason: `Acceso concedido por ${matchingRole} ${
        user.hierarchy ? `(elevado por ${user.hierarchy} Jerarquia)` : ""
      }`,
    };
  }
  return {
    hasAccess: false,
    reason: `Accesso denegado. Requerido permiso: ${requiredPermissions.join(
      ", "
    )}. Usuario tiene: ${user.role}-${user.hierarchy}`,
  };
}

export function validateAndCreateUser(role: string, hierarchy?: string): User {
  const isValidUserRole = (role: string): role is UserRole => {
    return Object.values(UserRole).includes(role as UserRole);
  };

  const isValidUserHierarchy = (
    hierarchy: string
  ): hierarchy is UserHierarchy => {
    return Object.values(UserHierarchy).includes(hierarchy as UserHierarchy);
  };

  return {
    role: isValidUserRole(role) ? (role as UserRole) : UserRole.AUXILIAR,
    hierarchy:
      hierarchy && isValidUserHierarchy(hierarchy)
        ? (hierarchy as UserHierarchy)
        : undefined,
  };
}
