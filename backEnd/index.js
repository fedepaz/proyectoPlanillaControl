import express from "express";
import helmet from "helmet";
require("dotenv").config();
require("./db");
import cors from "cors";
const notFound = require("./middleware/notFound.js");
const handleErrors = require("./middleware/handleErrors.js");

import planillasRoute from "./controllers/planillasRoute.js";
import dataRoute from "./controllers/dataRoute.js";
import oficialRoute from "./controllers/personal/oficialRoute.js";
import personalEmpresaRoute from "./controllers/personal/personalEmpresaRoute.js";
import personalSeguridadRoute from "./controllers/personal/personalSeguridadRoute.js";
import aeronaveRoute from "./controllers/datos/aeronaveRoute.js";
import codVueloRoute from "./controllers/datos/codVueloRoute.js";
import empresaRoute from "./controllers/datos/empresaRoute.js";
import aeropuertoRoute from "./controllers/datos/aeropuertoRoute.js";
import vehiculosRoute from "./controllers/datos/vehiculosRoute.js";

const app = express();

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter({}));
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.get("/health", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.status(234).send("ok");
});

app.get("/", (request, response) => {
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  return response.status(234).send("planillasBackend");
});

app.use("/data", dataRoute);

app.use("/planillas", planillasRoute);
app.use("/oficial", oficialRoute);
app.use("/personalEmpresa", personalEmpresaRoute);
app.use("/personalSeguridad", personalSeguridadRoute);

app.use("/aeronave", aeronaveRoute);
app.use("/empresa", empresaRoute);
app.use("/codVuelo", codVueloRoute);
app.use("/aeropuerto", aeropuertoRoute);
app.use("/vehiculos", vehiculosRoute);

if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(
          `App is listening in port: http://localhost:${process.env.PORT}/`
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export default app;
