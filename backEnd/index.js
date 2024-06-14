import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import planillasRoute from "./routes/planillasRoute.js";
import dataRoute from "./routes/dataRoute.js";
import personalRoute from "./routes/personalRoute.js";
import cors from "cors";

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
  return response.status(234).send("Bienvenidos a MERN stack");
});

app.use("/data", dataRoute);

app.use("/planillas", planillasRoute);
app.use("/personal", personalRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to datbase.");
    app.listen(PORT, () => {
      console.log(`App is listening in port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
