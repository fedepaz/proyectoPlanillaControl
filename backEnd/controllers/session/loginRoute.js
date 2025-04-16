import express from "express";
import { UserRepository } from "./userRepository.js";
import { signJWT, verifyJWT } from "../../utils/jwt.utils.js";
import { ResetPasswordRepository } from "./resetPasswordRepository.js";

const sessionRouter = express.Router();

sessionRouter.get("/", (req, res) => {
  try {
    const user = verifyJWT(req.signedCookies.access_token);

    const response = {
      authenticated: true,
      user: {
        dni: user.dni,
        oficialId: {
          dni: user.oficialId.dni,
          firstname: user.oficialId.firstname,
          lastname: user.oficialId.lastname,
          legajo: user.oficialId.legajo,
          id: user.oficialId.id,
        },
        role: user.role,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ authenticated: false });
  }
});

sessionRouter.post("/login", async (req, res, next) => {
  const { dni, password } = req.body;
  try {
    const user = await UserRepository.login({ dni, password });
    if (user.password || user.defaultPassword) {
      const resestInfo = await ResetPasswordRepository.findByUserId(user.id);
      if (resestInfo.okToChangePassword === false) {
        const error = new Error();
        error.name = "PasswordError";
        error.message = `El usuario ${user.email} ya ha solicitado cambio de contraseña, y se encuentra pendiente de aprobación`;
        throw error;
      }
      const error = new Error();
      error.name = "PasswordError";
      error.message = `El usuario ${user.email}, ya ha solicitado cambio de contraseña, y se encuentra APROBADO`;
      throw error;
    }
    const userInfo = {
      dni: user.dni,
      oficialId: user.oficialId,
      role: user.role,
    };

    const token = signJWT(userInfo, "12h");
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 86400000 / 2, //12hs
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      signed: true,
    });

    if (process.env.NODE_ENV === "production") {
      res.cookie("XSRF-TOKEN", req.csrfToken(), {
        secure: true,
        sameSite: "strict",
      });
    }
    res.status(200).json({
      message: "Login correcto",
      user: userInfo,
    });
  } catch (error) {
    next(error);
  }
});

sessionRouter.delete("/", (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logout correcto" });
});

sessionRouter.post("/register", async (req, res, next) => {
  const { dni, password, email, firstname, lastname, legajo } = req.body;
  try {
    const { oficial, user } = await UserRepository.findAllParameters(
      email,
      dni,
      legajo
    );
    if (oficial !== null) {
      const error = new Error();
      error.name = "DuplicateData";
      error.message = "El oficial ya existe, comunicarse con el administrador";
      throw error;
    }
    if (user !== null) {
      const error = new Error();
      error.name = "DuplicateData";
      error.message = "El usuario ya existe, comunicarse con el administrador";
      throw error;
    }
    const oficialId = await UserRepository.createOficial({
      dni,
      firstname,
      lastname,
      legajo,
    });
    try {
      const userID = await UserRepository.create({
        dni,
        email,
        password,
        oficialId,
      });
      res.status(201).json({ message: "Usuario creado", userID });
    } catch (error) {
      next(error);
    }
  } catch (err) {
    next(err);
  }
});

export default sessionRouter;
