const ERROR_HANDLERS = {
  CastError: (res, error) => {
    const { model } = error;
    res.status(400).send({
      error: `ID of ${model.modelName} is malformed`,
      value: error.value,
      field: error.field,
    });
  },

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  OficialNotFound: (res) =>
    res.status(404).send({ error: "Oficial Not Found" }),
  EmpresaNotFound: (res) =>
    res.status(404).send({ error: "Empresa Not Found" }),
  PersonalNotFound: (res) =>
    res.status(404).send({ error: "Personal Not Found" }),
  MatriculaNotFound: (res) =>
    res.status(404).send({ error: "Matricula Not Found" }),
  AeropuertoNotFound: (res) =>
    res.status(404).send({ error: "Aeropuerto Not Found" }),
  VueloNotFound: (res) => res.status(404).send({ error: "Vuelo Not Found" }),
  VehiculoNotFound: (res) =>
    res.status(404).send({ error: "Vehiculo Not Found" }),
  EmpresaNotFound: (res) =>
    res.status(404).send({ error: "Empresa Not Found" }),
  TipoEmpresaNotFound: (res) =>
    res.status(404).send({ error: "TipoEmpresa Not Found" }),
  CodVueloNotFound: (res) =>
    res.status(404).send({ error: "CodVuelo Not Found" }),
  PlanillaNotFound: (res) =>
    res.status(404).send({ error: "Planilla Not Found" }),
  NotFound: (res, { message }) => res.status(404).send({ error: message }),

  MissingData: (res, { message }) => res.status(400).send({ error: message }),
  AeropuertoDuplicate: (res, { message }) =>
    res.status(409).send({ error: message }),

  MongoServerError: (res, error) => {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(409).send({
        error: `Duplicate value. ${field.toUpperCase()} already exists`,
      });
    } else {
      res.status(500).send({
        error: "Database Operation Error",
        details: `MongoDB error ${error.code}: ${error.message}`,
      });
    }
  },
  JsonWebTokenError: (res) =>
    res.status(401).json({ error: "token missing or invalid" }),

  TokenExpirerError: (res) => res.status(401).json({ error: "token expired" }),

  defaultError: (res, error) => {
    console.log(error);
    res.status(500).send({ error: "An unexpected error occurred" });
  },
};

export const handleErrors = (error, request, response, next) => {
  //console.log(error.name, error.message);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

  handler(response, error);
};
