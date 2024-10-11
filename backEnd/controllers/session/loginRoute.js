import express from "express";
import { UserRepository } from "./userRepository.js";
import jwt from "jsonwebtoken";

const SECRET = toString(process.env.SECRET_JWT_KEY);

const sessionRouter = express.Router();

sessionRouter.get("/", (req, res) => {
  const { user } = req.session;
  if (!user) {
    const { dni } = "";
    res.status(200).json(dni);
  }
  const { dni } = user;
  res.status(200).json(dni);
});

sessionRouter.post("/login", async (req, res) => {
  const { dni, password } = req.body;
  try {
    const user = await UserRepository.login({ dni, password });
    const userInfo = {
      dni: user.dni,
      oficialId: user.oficialId,
    };

    const token = jwt.sign(
      { dni: userInfo.dni, oficialId: userInfo.oficialId },
      SECRET,
      { expiresIn: "24h" }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 86400000,
        sameSite: "None",
        secure: true,
      })
      .send({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

sessionRouter.post("/logout", (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logout succesful" });
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
    res.status(400).json({ message: error.message });
  }
});

sessionRouter.get("/protected", (req, res) => {
  const { user } = req.session;
  if (!user) {
    res.status(401).json({ message: "No token provided" });
  }
  const { dni } = user;

  res.status(200).json({ message: "Protected connected", dni });
});

export default sessionRouter;
