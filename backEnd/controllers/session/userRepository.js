import { User } from "./userModel.js";
import { Oficial } from "../../models/personalModel.js";
import bcrypt from "bcrypt";
import { defaultPassword } from "../../enums/enums.js";

export class UserRepository {
  static async create({ dni, password, email, oficialId }) {
    const userDNI = await User.findOne({ dni });
    if (userDNI !== null) {
      const error = new Error();
      error.name = "DuplicateData";
      error.message = "El usuario ya existe, comunicarse con el administrador";
      throw error;
    }

    try {
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        dni,
        email,
        password: hashedPassword,
        role: "auxiliar",
        oficialId,
      });
      return newUser.id;
    } catch (error) {
      throw error;
    }
  }

  static async createOficial({ dni, firstname, lastname, legajo }) {
    const existingOficial = await Oficial.findOne({
      $or: [{ dni }, { legajo }],
    });
    if (existingOficial !== null) {
      const error = new Error();
      error.name = "DuplicateData";
      error.message = "El oficial ya existe, comunicarse con el administrador";
      throw error;
    }
    try {
      const newOficial = new Oficial({
        dni,
        firstname,
        lastname,
        legajo,
      });
      const savedOficial = await newOficial.save();
      return savedOficial.id;
    } catch (error) {
      throw error;
    }
  }
  static async resetPassword({ dni, password }) {
    try {
      const editUser = await User.findOne({ dni });
      if (!editUser) {
        const error = new Error();
        error.name = "UserNotFound";
        error.message = "El usuario no existe";
        throw error;
      }
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      editUser.password = hashedPassword;
      await editUser.save();
      return editUser.id;
    } catch (error) {
      throw error;
    }
  }

  static async login({ dni, password }) {
    try {
      const user = await User.findOne({ dni }).populate("oficialId");
      if (!user) {
        const error = new Error();
        error.name = "UserNotFound";
        error.message = "El usuario no existe";
        throw error;
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        const error = new Error();
        error.name = "AuthenticationError";
        error.message = "Credenciales inválidas";
        throw error;
      }
      const equalDefaultPassword = await bcrypt.compare(
        defaultPassword,
        user.password
      );
      if (equalDefaultPassword) {
        const userWithPassword = {
          dni: user.dni,
          oficialId: user.oficialId,
          role: user.role,
          password,
          defaultPassword,
        };
        return userWithPassword;
      } else {
        const userWithoutPassword = {
          dni: user.dni,
          oficialId: user.oficialId,
          role: user.role,
        };
        return userWithoutPassword;
      }
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    const user = await User.findOne({ email }).populate("oficialId");
    if (!user) return null;
    return user;
  }

  static async findAllParameters(email, dni, legajo) {
    const existingOficial = await Oficial.findOne({
      $or: [{ dni }, { legajo }],
    });

    const existingUser = await User.findOne({ $or: [{ dni }, { email }] });

    return { oficial: existingOficial, user: existingUser };
  }
}
