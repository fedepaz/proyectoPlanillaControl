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

export const RoleAccessMatrix = {
  [Roles.ADMIN]: {
    users: { read: true, create: true, update: true, delete: true },
    roles: { read: true, create: true, update: true, delete: true },
    oficials: { read: true, create: true, update: true, delete: true },
    planillas: { read: true, create: true, update: true, delete: true },
    historial: { read: true, create: true, update: true, delete: true },
  },
  [Roles.AUXILIAR]: {
    users: { read: true, create: true, update: true, delete: true },
    roles: { read: true, create: true, update: true, delete: true },
    oficials: { read: true, create: true, update: true, delete: true },
    planillas: { read: true, create: true, update: true, delete: true },
    historial: { read: true, create: true, update: true, delete: true },
  },
  [Roles.RESPONSABLE]: {
    users: { read: true, create: true, update: true, delete: true },
    roles: { read: true, create: true, update: true, delete: true },
    oficials: { read: false, create: false, update: false, delete: false },
    planillas: { read: false, create: false, update: false, delete: false },
    historial: { read: false, create: false, update: false, delete: false },
  },
  [Roles.SUPERVISOR]: {
    users: { read: true, create: true, update: true, delete: true },
    roles: { read: true, create: true, update: true, delete: true },
    oficials: { read: true, create: true, update: true, delete: true },
    planillas: { read: true, create: true, update: true, delete: true },
    historial: { read: true, create: true, update: true, delete: true },
  },
  [Roles.OPER_UNIDAD]: {
    users: { read: true, create: true, update: true, delete: true },
    roles: { read: true, create: true, update: true, delete: true },
    oficials: { read: true, create: true, update: true, delete: true },
    planillas: { read: true, create: true, update: true, delete: true },
    historial: { read: true, create: true, update: true, delete: true },
  },
  [Roles.OPER_REGIONAL]: {
    users: { read: true, create: true, update: true, delete: true },
    roles: { read: true, create: true, update: true, delete: true },
    oficials: { read: true, create: true, update: true, delete: true },
    planillas: { read: true, create: true, update: true, delete: true },
    historial: { read: true, create: true, update: true, delete: true },
  },
  [Roles.OPER_CEAC]: {
    users: { read: true, create: true, update: true, delete: true },
    roles: { read: true, create: true, update: true, delete: true },
    oficials: { read: true, create: true, update: true, delete: true },
    planillas: { read: true, create: true, update: true, delete: true },
    historial: { read: true, create: true, update: true, delete: true },
  },
};
