import { defaultPassword } from "../../enums/enums.js";
import { ResetPassword } from "./userModel.js";
import { UserRepository } from "./userRepository.js";
import bcrypt from "bcrypt";

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
      const userPasswordChanged = await UserRepository.findByEmail(user.email);
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);
      userPasswordChanged.password = hashedPassword;
      await userPasswordChanged.save();

      const newResetPassword = await ResetPassword.create({
        user,
        okToChangePassword: false,
        timesAsked: 1,
        askedAtLast: new Date(),
      });
      const resetPassword = {
        requestId: newResetPassword.id,
        dni: newResetPassword.user.dni,
        email: newResetPassword.user.email,
        timesAsked: 1,
        askedAtLast: new Date(),
      };
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
      await resetPassword.save();
      return [resetPassword.user.dni, resetPassword.okToChangePassword];
    } catch (error) {
      throw error;
    }
  }

  static async passwordChanged(requestId) {
    try {
      const resetPassword = await ResetPassword.findById({ requestId });
      if (!resetPassword) {
        const error = new Error();
        error.name = "NotFound";
        error.message = "La solicitud de contraseña no existe";
        throw error;
      }

      resetPassword.changed = true;
      (resetPassword.changedAt = new Date()), resetPassword.save();
      return resetPassword.changedAt;
    } catch (error) {
      throw error;
    }
  }
}
