import { Roles } from "../enums/enums";

export const EntityGroups = {
  SENSITIVE_OPERATIONS: ["oficial", "user", "role", "system"],
  BASIC_OPERATIONS: ["planilla", "planillas", "historial"],
  SPECIAL_FEATURES: ["ai_models"],
};

const groupPermissions = {
  [Roles.ADMIN]: {
    [EntityGroups.SENSITIVE_OPERATIONS]: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    [EntityGroups.SPECIAL_FEATURES]: {
      all: true,
    },
  },
  [Roles.OPER_REGIONAL]: {
    [EntityGroups.BASIC_OPERATIONS]: {
      read: true,
    },
  },
};
