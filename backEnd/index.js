import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
import { handleErrors } from "./middlewares/handleErrors.js";
import { cookieVerify } from "./middlewares/cookieVerify.js";
import { notFound } from "./middlewares/notFound.js";
import { debugMiddleware } from "./middlewares/debug.js";
import limiter from "./middlewares/limiter.js";
import cookieParser from "cookie-parser";

import planillasRouter from "./controllers/planillasRoute.js";
import dataRouter from "./controllers/dataRoute.js";
import oficialRouter from "./controllers/personal/oficialRoute.js";
import personalEmpresaRouter from "./controllers/personal/personalEmpresaRoute.js";
import personalSeguridadRouter from "./controllers/personal/personalSeguridadRoute.js";
import aeronaveRouter from "./controllers/datos/aeronaveRoute.js";
import codVueloRouter from "./controllers/datos/codVueloRoute.js";
import empresaRouter from "./controllers/datos/empresaRoute.js";
import aeropuertoRouter from "./controllers/datos/aeropuertoRoute.js";
import vehiculosRouter from "./controllers/datos/vehiculosRoute.js";
import sessionRouter from "./controllers/session/loginRoute.js";

const app = express();

dotenv.config();

//app.use(debugMiddleware);

app.use(helmet());
app.use(cookieParser());
//app.use(limiter);
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter({}));
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.contentSecurityPolicy());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.get("/health", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.status(234).send("ok");
});

app.use(cookieVerify);

app.get("/", (request, response) => {
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  return response.status(200).send("planillasBackend");
});

app.use("/session", sessionRouter);

app.use("/data", dataRouter);

app.use("/planillas", planillasRouter);
app.use("/oficial", oficialRouter);
app.use("/personalEmpresa", personalEmpresaRouter);
app.use("/personalSeguridad", personalSeguridadRouter);

app.use("/aeronave", aeronaveRouter);
app.use("/empresa", empresaRouter);
app.use("/codVuelo", codVueloRouter);
app.use("/aeropuerto", aeropuertoRouter);
app.use("/vehiculos", vehiculosRouter);

app.use(notFound);
app.use(handleErrors);

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
      console.log(error.name);
    });
}

export default app;
