import express from "express";
import { UserRepository } from "./userRepository.js";
import { signJWT } from "../../utils/jwt.utils.js";

const sessionRouter = express.Router();

sessionRouter.get("/", (req, res) => {
  const { user } = req.session;
  if (!user) {
    const { dni } = "";
    res.status(200).json(dni);
  }
  const response = {
    user: {
      dni: user.dni,
      oficialId: {
        dni: user.oficialId.dni,
        firstname: user.oficialId.firstname,
        lastname: user.oficialId.lastname,
        legajo: user.oficialId.legajo,
        id: user.oficialId.id,
      },
    },
  };

  res.status(200).json(response);
});

sessionRouter.post("/", async (req, res) => {
  const { dni, password } = req.body;
  try {
    const user = await UserRepository.login({ dni, password });

    const accessToken = signJWT(user, process.env.ACCESS_TOKEN_EXPIRES);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login succesful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

sessionRouter.delete("/", (req, res) => {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });
  return res.status(200).json({ message: "Logout succesful" });
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
