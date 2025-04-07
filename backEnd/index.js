import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
import { csrfProtection } from "./middlewares/csrf.js";
import { handleErrors } from "./middlewares/handleErrors.js";
import { authenticate } from "./middlewares/authenticate.js";
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
import resetPasswordRouter from "./controllers/session/resetPassword.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "test") {
  app.use(cookieParser());
} else {
  app.use(cookieParser(process.env.COOKIE_SECRET));
}
if (process.env.NODE_ENV === "production") {
  app.use(limiter);
}
app.use(helmet());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true,
    includeSubDomains: true,
    preload: true,
  })
);
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.xssFilter({}));

app.use(express.json({ limit: "100kb" }));
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    })
  );
}
app.get("/health", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.status(234).send("ok");
});
app.get("/", (request, response) => {
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  return response.status(234).send("planillasBackend");
});
app.use("/session", sessionRouter);
app.use("/resetPassword", resetPasswordRouter);

app.use(authenticate);
app.use(csrfProtection);
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

app.use(handleErrors);

if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`App is listening in port: http://localhost:${PORT}/`);
      });
    })
    .catch((error) => {
      console.log(error.name);
    });
}

export default app;
