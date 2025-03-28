import { defaultPassword } from "../../enums/enums.js";
import { ResetPassword } from "./userModel.js";

export class ResetPasswordRepository {
  static async create({ user }) {
    try {
      const resetAsked = await ResetPassword.findOne({ user }).populate("user");
      if (resetAsked !== null) {
        resetAsked.timesAsked += 1;
        resetAsked.askedAtLast = new Date();
        await resetAsked.save();

        const error = new Error();
        error.name = "DuplicateData";
        error.message = `El usuario ${resetAsked.user.email} ya ha solicitado una contraseña, debe ser medio imbécil`;
        throw error;
      }
      const resetPassword = await ResetPassword.create({
        dni: resetAsked.user.dni,
        email: resetAsked.user.email,
        timesAsked: 1,
        askedAtLast: new Date(),
      });
      return resetPassword;
    } catch (error) {
      throw error;
    }
  }
  static async findAll() {
    try {
      const resetPasswords = await ResetPassword.find().populate("user");
      return resetPasswords.map((resetPassword) => {
        return {
          requestId: resetPassword.id,
          dni: resetPassword.user.dni,
          email: resetPassword.user.email,
          timesAsked: resetPassword.timesAsked,
          askedAtLast: resetPassword.askedAtLast,
        };
      });
    } catch (error) {
      throw error;
    }
  }
  static async resetPassword({ requestId }) {
    try {
      const resetPassword = await ResetPassword.findById(requestId).populate(
        "user"
      );
      if (!resetPassword) {
        const error = new Error();
        error.name = "NotFound";
        error.message = "La solicitud de contraseña no existe";
        throw error;
      }
      console.log(resetPassword);
      return [resetPassword.user.dni, defaultPassword];
    } catch (error) {
      throw error;
    }
  }
}
