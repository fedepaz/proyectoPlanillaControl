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
    if (resetPassword.okToChangePassword === false) {
      res.status(201).json({
        ...resetPassword,
        message:
          "Solicitud cambio de contraseña enviada, pendiente de aprobación",
      });
    } else {
      res.status(201).json({
        ...resetPassword,
        message: "Solicitud cambio de contraseña aprobada",
      });
    }
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
    const dni = await ResetPasswordRepository.resetPassword({
      requestId,
    });
    const user = await UserRepository.resetPassword({ dni, password });
    const dateChanged = await ResetPasswordRepository.passwordChanged(
      requestId
    );
    res.status(200).json({
      ...user,
      dateUpdated: dateChanged,
      message: "Contraseña reseteada correctamente",
    });
  } catch (error) {
    next(error);
  }
});

export default resetRouter;
