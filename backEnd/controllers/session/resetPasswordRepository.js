import { defaultPassword } from "../../enums/enums.js";
import { ResetPassword } from "./userModel.js";

export class ResetPasswordRepository {
  static async create({ user }) {
    try {
      const resetAsked = await ResetPassword.findOne({ user });
      if (resetAsked !== null) {
        const error = new Error();
        error.name = "DuplicateData";
        error.message =
          "El usuario ya ha solicitado una contraseña, debe ser medio imbécil";
        throw error;
      }
      const resetPassword = await ResetPassword.create({
        user,
        askedAt: new Date(),
      });
      return resetPassword;
    } catch (error) {
      throw error;
    }
  }
  static async findAll() {
    try {
      const resetPasswords = await ResetPassword.find();
      return resetPasswords;
    } catch (error) {
      throw error;
    }
  }
  static async resetPassword({ requestId }) {
    try {
      const resetPassword = await ResetPassword.findById(requestId);
      if (!resetPassword) {
        const error = new Error();
        error.name = "NotFound";
        error.message = "La solicitud de contraseña no existe";
        throw error;
      }
      return [resetPassword.user.dni, defaultPassword];
    } catch (error) {
      throw error;
    }
  }
}
