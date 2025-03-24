export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error();
      error.name = "AuthenticationError";
      error.message = "Invalid session";
      return next(error);
    }
    const { role } = req.user;
    if (roles.includes(role)) {
      return next();
    } else {
      const error = new Error();
      error.name = "AuthorizationError";
      error.message = "No tiene permisos";
      return next(error);
    }
  };
};
