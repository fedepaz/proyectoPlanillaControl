const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).send({ error: "ID used is malformed" }),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: (res) =>
    res.status(401).json({ error: "token missing or invalid" }),

  TokenExpirerError: (res) => res.status(401).json({ error: "token expired" }),

  defaultError: (res, error) => {
    console.log(error.name);
    res.status(500).end();
  },
  OficialNotFound: (res) =>
    res.status(404).send({ error: "Oficial ID Not Found" }),
  MissingData: (res, { message }) => res.status(400).send({ error: message }),
  MongoServerError: (res, error) => {
    if (error.code === 11000) {
      if (error.keyPattern.dni) {
        res.status(409).send({ error: "Duplicate value. DNI already exists" });
      } else if (error.keyPattern.legajo) {
        res
          .status(409)
          .send({ error: "Duplicate value. Legajo already exists" });
      }
    } else {
      res.status(400).send({ error: "Database Operation Error" });
    }
  },
};

export const handleErrors = (error, request, response, next) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;

  handler(response, error);
};
