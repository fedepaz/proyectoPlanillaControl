import { User } from "./userModel.js";
import bcrypt from "bcrypt";

export class UserRepository {
  static async create({ dni, password, email, oficialId }) {
    const userDNI = await User.findOne({ dni });
    if (userDNI) {
      throw new Error("El usuario ya existe");
    }
    const userOficial = await User.findOne({ oficialId });
    if (userOficial) {
      throw new Error("El oficial ya existe");
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
      const newUser = await User.create({
        dni: dni,
        email: email,
        password: hashedPassword,
        role: "auxiliar",
        oficialId: oficialId,
      });
      return newUser.id;
    } catch (error) {
      throw error;
    }
  }

  static async login({ dni, password }) {
    const user = await User.findOne({ dni }).populate("oficialId");
    if (!user) {
      throw new Error("El usuario no existe");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Contraseña incorrecta");
    }
    const userWithoutPassword = {
      dni: user.dni,
      oficialId: user.oficialId,
    };
    return userWithoutPassword;
  }
}
