import express, { request, response } from "express";
import dotenv from "dotenv";
import { PORT, mongoDBURL } from "./config.js";
import { connectDB } from "./db.js";
import mongoose from "mongoose";
import planillasRoute from "./routes/planillasRoute.js";
import dataRoute from "./routes/dataRoute.js";
import oficialRoute from "./routes/personal/oficialRoute.js";
import personalEmpresaRoute from "./routes/personal/personalEmpresaRoute.js";
import personalSeguridadRoute from "./routes/personal/personalSeguridadRoute.js";
import aeronaveRoute from "./routes/datos/aeronaveRoute.js";
import codVueloRoute from "./routes/datos/codVueloRoute.js";
import empresaRoute from "./routes/datos/empresaRoute.js";
import aeropuertoRoute from "./routes/datos/aeropuertoRoute.js";
import vehiculosRoute from "./routes/datos/vehiculosRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
/*app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
*/
app.get("/", (request, response) => {
  return response.status(234).send("<h1>PLanillas</h1>");
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
        console.log(`App is listening in port: ${process.env.PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export default app;
