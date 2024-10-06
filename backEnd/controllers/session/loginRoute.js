import express from "express";
import { UserRepository } from "./userRepository.js";

const sessionRouter = express.Router();

sessionRouter.post("/login", async (req, res) => {
  const { dni, password } = req.body;
  try {
    const user = await UserRepository.login({ dni, password });
    res.status(200).json({ message: "Login connected", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

sessionRouter.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout connected" });
});

sessionRouter.post("/register", async (req, res) => {
  const { dni, email, password, oficialId } = req.body;
  try {
    const userID = await UserRepository.create({
      dni,
      email,
      password,
      oficialId,
    });
    res.status(200).json({ message: "User registered", userID });
  } catch (error) {
    //console.error(error);
    res.status(400).json({ message: error.message });
  }
});

sessionRouter.get("/protected", (req, res) => {
  res.status(200).json({ message: "Protected connected" });
});

export default sessionRouter;
