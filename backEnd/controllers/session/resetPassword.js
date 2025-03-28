import express from "express";
import { UserRepository } from "./userRepository.js";
import { ResetPasswordRepository } from "./resetPasswordRepository.js";

const resetRouter = express.Router();

resetRouter.post("/", async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      const error = new Error();
      error.name = "UserNotFound";
      error.message = "El usuario no existe";
      throw error;
    }
    const resetPassword = await ResetPasswordRepository.create({ user });
    res.status(201).json({
      ...resetPassword,
      message: "Solicitud de contraseña enviada, pendiente de aprobación",
    });
  } catch (error) {
    next(error);
  }
});

resetRouter.get("/", async (req, res, next) => {
  try {
    const resetPasswords = await ResetPasswordRepository.findAll();
    res.status(200).json(resetPasswords);
  } catch (error) {
    next(error);
  }
});

resetRouter.patch("/", async (req, res, next) => {
  const { requestId, password } = req.body;
  try {
    const [dni, okToChangePassword] =
      await ResetPasswordRepository.resetPassword({
        requestId,
      });

    if (!okToChangePassword) {
      const error = new Error();
      error.name = "AuthorizationError";
      error.message = "No se encuentra autorizado para cambiar la contraseña";
      throw error;
    }

    const user = await UserRepository.resetPassword({ dni, password });
    res.status(200).json({
      message: "Contraseña reseteada correctamente",
      user,
    });
  } catch (error) {
    next(error);
  }
});

export default resetRouter;
