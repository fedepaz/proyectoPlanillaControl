import { Roles } from "../enums/enums";

export const RolesHierarchy = {
  [Roles.ADMIN]: 100,
  [Roles.OPER_CEAC]: 75,
  [Roles.OPER_REGIONAL]: 60,
  [Roles.OPER_UNIDAD]: 50,
  [Roles.SUPERVISOR]: 40,
  [Roles.RESPONSABLE]: 25,
  [Roles.AUXILIAR]: 10,
};

const baseRolePermissions = {
  profile: {
    read: true,
    update: true,
  },
  planillas: {
    read: true,
    create: true,
  },
  dashboard: {
    view: true,
  },
};

const permissionTiers = {
  ADMIN: {
    users: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    roles: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    all: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  HIGH: {
    oficials: {
      read: true,
      create: true,
      update: true,
    },
    planillas: {
      read: true,
      create: true,
      update: true,
    },
  },
  MEDIUM: {
    historial: {
      read: true,
    },
    planillas: {
      read: true,
      update: true,
    },
  },
  LOW: {},
};

export const RoleAccessMatrix = {
  [Roles.ADMIN]: {
    ...baseRolePermissions,
    ...permissionTiers.ADMIN,
  },
  [Roles.AUXILIAR]: {
    ...baseRolePermissions,
    ...permissionTiers.LOW,
  },
  [Roles.RESPONSABLE]: {
    ...baseRolePermissions,
    ...permissionTiers.MEDIUM,
  },
  [Roles.SUPERVISOR]: {
    ...baseRolePermissions,
    ...permissionTiers.HIGH,
  },
  [Roles.OPER_UNIDAD]: {
    ...baseRolePermissions,
    ...permissionTiers.MEDIUM,
  },
  [Roles.OPER_REGIONAL]: {
    ...baseRolePermissions,
    ...permissionTiers.MEDIUM,

    oficials: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
};
