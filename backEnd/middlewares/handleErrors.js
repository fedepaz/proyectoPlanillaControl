const ERROR_HANDLERS = {
  CastError: (error) => ({
    status: 400,
    body: {
      error: `ID of ${error.model.modelName} is malformed`,
      value: error.value,
      field: error.field,
    },
  }),

  ValidationError: ({ message }) => ({
    status: message.includes("Legajo") ? 409 : 400,
    body: {
      error: message.includes("Legajo") ? "Legajo no corresponde" : message,
    },
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

  TokenExpirerError: () => ({
    status: 401,
    body: { error: "token expired" },
  }),

  defaultError: () => ({
    status: 500,
    body: { error: "An unexpected error occurred" },
  }),
};

export const handleErrors = (error, request, response, next) => {
  console.error("Error:", error);

  if (response.headersSent) {
    console.warn(
      "Headers already sent. Delegating to default Express error handler."
    );
    return next(error);
  }

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  const { status, body } = handler(error);

  response.status(status).json({
    error: body.error,
    statusCode: status,
    statusMessage: STATUS_CODES[status],
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};
