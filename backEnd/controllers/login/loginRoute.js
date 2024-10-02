import express from "express";

const loginRouter = express.Router();

loginRouter.post("/login", (req, res) => {
  res.status(200).json({ message: "Login connected" });
});
