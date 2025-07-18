import { User } from "./userModel.js";
import { Aeropuerto, Oficial } from "../../models/personalModel.js";
import bcrypt from "bcrypt";
import { defaultPassword } from "../../enums/enums.js";
import { Jerarquia } from "../../models/opcionesModel.js";

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

  static async createOficial({
    dni,
    firstname,
    lastname,
    legajo,
    currentAirportId,
    jerarquiaId,
  }) {
    try {
      const existingAirport = await Aeropuerto.findById(currentAirportId);
      if (!existingAirport) {
        const error = new Error();
        error.name = "AirportNotFound";
        throw error;
      }

      const existingJerarquia = await Jerarquia.findById(jerarquiaId);
      if (!existingJerarquia) {
        const error = new Error();
        error.name = "JerarquiaNotFound";
        throw error;
      }

      const newOficial = new Oficial({
        dni,
        firstname,
        lastname,
        legajo,
        currentAirportId,
        jerarquiaId,
      });
      const savedOficial = await newOficial.save();
      return savedOficial.id;
    } catch (error) {
      throw error;
    }
  }

  static async resetPassword({ dni, password }) {
    try {
      if (!password || password === "") {
        const error = new Error();
        error.name = "ValidationError";
        error.message = "La contraseña es requerida";
        throw error;
      }

      // Then check password length
      if (password.length < 9) {
        const error = new Error();
        error.name = "ValidationError";
        error.message = "La contraseña debe tener al menos 9 caracteres";
        throw error;
      }
      const editUser = await User.findOne({ dni }).populate("oficialId");
      if (!editUser) {
        const error = new Error();
        error.name = "UserNotFound";
        error.message = "El usuario no existe";
        throw error;
      }
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      editUser.password = hashedPassword;
      await editUser.save({ runValidators: true });
      const userWithoutPassword = {
        dni: editUser.dni,
        email: editUser.email,
        role: editUser.role,
        name: `${editUser.oficialId.firstname} ${editUser.oficialId.lastname}`,
        legajo: editUser.oficialId.legajo,
      };
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  static async login({ dni, password }) {
    try {
      const user = await User.findOne({ dni }).populate({
        path: "oficialId",
        populate: [{ path: "currentAirportId" }, { path: "jerarquiaId" }],
      });

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
          id: user.id,
          dni: user.dni,
          email: user.email,
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

  static async findAll() {
    // users without hashed password and with all the populated data
    const users = await User.find().populate({
      path: "oficialId",
      populate: [{ path: "currentAirportId" }, { path: "jerarquiaId" }],
    });
    return users;
  }
}
