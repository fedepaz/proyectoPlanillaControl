import { RoleAccessMatrix, RolesHierarchy } from "../config/roles.config";

export const authorize = (requiredRoles = [], requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        const error = new Error();
        error.name = "AuthenticationError";
        error.message = "Invalid session";
        return next(error);
      }
      const userRole = req.user.role;
      const hasHierarchyAccess = requiredRoles.some(
        (role) => RolesHierarchy[role] >= RolesHierarchy[userRole]
      );

      const hasMatrixAccess = requiredPermission
        ? RoleAccessMatrix[userRole]?.[requiredPermission.entity]?.includes(
            requiredPermission.action
          )
        : true;

      if (!hasHierarchyAccess || !hasMatrixAccess) {
        const error = new Error();
        error.name = "AuthorizationError";
        error.message = "No tiene permisos";
        return next(error);
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
};
