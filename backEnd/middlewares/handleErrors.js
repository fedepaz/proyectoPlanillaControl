import logError from "../utils/logError.utils.js";
import logErrorDB from "../utils/logErrorDB.utils.js";

const ERROR_HANDLERS = {
  CastError: (error) => {
    const modelName = error?.model?.modelName || "UknownModel";
    const fieldName = error?.path || "UknownField";
    const value = error?.value || "UknownValue";

    return {
      status: 400,
      body: {
        error: `Valor inválido para el campo ${fieldName} del modelo ${modelName}`,
        value,
        fieldName,
      },
    };
  },

  ValidationError: ({ message }) => ({
    status: message.includes("Legajo") ? 409 : 400,
    body: {
      error: message.includes("Legajo") ? "Legajo no corresponde" : message,
    },
  }),

  PersonalRegistrado: ({ message }) => ({
    status: 409,
    body: { error: message },
  }),

  AuthenticationError: ({ message }) => ({
    status: 401,
    body: { error: message },
  }),

  PasswordError: ({ message }) => ({
    status: 403,
    body: { error: message },
  }),
  AuthorizationError: ({ message }) => ({
    status: 403,
    body: { error: message },
  }),

  DuplicateData: ({ message }) => ({
    status: 409,
    body: { error: message },
  }),

  UserNotFound: ({ message }) => ({
    status: 404,
    body: { error: message },
  }),

  OficialNotFound: () => ({
    status: 404,
    body: { error: "Oficial Not Found" },
  }),
  EmpresaNotFound: () => ({
    status: 404,
    body: { error: "Empresa Not Found" },
  }),
  PersonalNotFound: () => ({
    status: 404,
    body: { error: "Personal Not Found" },
  }),
  MatriculaNotFound: () => ({
    status: 404,
    body: { error: "Matricula Not Found" },
  }),
  AeropuertoNotFound: () => ({
    status: 404,
    body: { error: "Aeropuerto Not Found" },
  }),
  VueloNotFound: () => ({ status: 404, body: { error: "Vuelo Not Found" } }),
  VehiculoNotFound: () => ({
    status: 404,
    body: { error: "Vehiculo Not Found" },
  }),
  TipoEmpresaNotFound: () => ({
    status: 404,
    body: { error: "TipoEmpresa Not Found" },
  }),
  CodVueloNotFound: () => ({
    status: 404,
    body: { error: "CodVuelo Not Found" },
  }),
  PlanillaNotFound: () => ({
    status: 404,
    body: { error: "Planilla Not Found" },
  }),

  JearquiaNotFound: () => ({
    status: 404,
    body: { error: "Jearquia Not Found" },
  }),

  NotFound: ({ message }) => ({ status: 404, body: { error: message } }),

  MissingData: ({ message }) => ({ status: 400, body: { error: message } }),
  AeropuertoDuplicate: ({ message }) => ({
    status: 409,
    body: { error: message },
  }),

  MongoServerError: (error) => {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return {
        status: 409,
        body: { error: `Valor duplicado. ${field.toUpperCase()} ya existe` },
      };
    }
    return {
      status: 500,
      body: {
        error: "Database Operation Error",
        details: `MongoDB error ${error.code}: ${error.message}`,
      },
    };
  },

  JsonWebTokenError: () => ({
    status: 401,
    body: { error: "token missing or invalid" },
  }),

  defaultError: () => ({
    status: 500,
    body: { error: "An unexpected error occurred" },
  }),
};

const STATUS_CODES = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
};

export const handleErrors = (error, request, response, next) => {
  error.request = request;
  error.method = request.method;
  error.body = JSON.stringify(request.body);
  error.client = {
    ip: request.ip,
    hostname: request.hostname,
    protocol: request.protocol,
  };

  logError(error);

  logErrorDB(error, request);
  if (process.env.NODE_ENV === "development") {
    console.error(`[${new Date().toISOString()}] ${error}`);
  } else {
    console.error(
      `[${new Date().toISOString()}]Error: contact your administrator`
    );
  }

  if (response.headersSent) {
    console.warn(
      "Headers already sent. Delegating to default Express error handler."
    );
    return next(error);
  }

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

  const { status, body } = handler(error);
  response.status(status).json({
    error: handler(error),

    ...(process.env.NODE_ENV === "development" && {
      name: error.name,
      message: error.message,
      statusCode: STATUS_CODES[status],
      stack: error.stack.split("\n"),
    }),
  });
};
