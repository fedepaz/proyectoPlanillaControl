import { defaultPassword } from "../../enums/enums.js";
import { ResetPassword } from "./userModel.js";
import { UserRepository } from "./userRepository.js";
import bcrypt from "bcrypt";

export class ResetPasswordRepository {
  static async create({ user }) {
    try {
      const resetAsked = await ResetPassword.findOne({ user }).populate("user");

      if (resetAsked !== null) {
        if (resetAsked.okToChangePassword === false) {
          if (resetAsked.changed === false) {
            if (resetAsked.timesChanged > 1) {
              const error = new Error();
              error.name = "DuplicateData";
              error.message = `El usuario ${resetAsked.user.email} ya ha cambiado la contraseña, debe ser medio imbécil`;
              throw error;
            } else {
              const error = new Error();
              error.name = "DuplicateData";
              error.message = `El usuario ${resetAsked.user.email} ya ha solicitado una contraseña, pendiente de aprobación`;
              throw error;
            }
          }
          resetAsked.okToChangePassword = false;
          resetAsked.timesChanged += 1;
          resetAsked.askedAtLast = new Date();
          resetAsked.changed = false;
          resetAsked.save({ runValidators: true });
          const error = new Error();
          error.name = "DuplicateData";
          error.message = `El usuario ${resetAsked.user.email} ya ha cambiado la contraseña, ahora va a tener que esperar por imbécil`;
          throw error;
        } else {
          const resetApproved = {
            id: resetAsked.id,
            okToChangePassword: resetAsked.okToChangePassword,
            changed: resetAsked.changed,
          };
          return resetApproved;
        }
      }
      const userPasswordChanged = await UserRepository.findByEmail(user.email);
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);
      userPasswordChanged.password = hashedPassword;
      await userPasswordChanged.save();

      const newResetPassword = await ResetPassword.create({
        user,
        okToChangePassword: false,
        timesChanged: 1,
        askedAtLast: new Date(),
        changed: false,
      });
      const resetPassword = {
        requestId: newResetPassword.id,
        dni: newResetPassword.user.dni,
        email: newResetPassword.user.email,
        timesChanged: newResetPassword.timesChanged,
        askedAtLast: new Date(),
      };
      return resetPassword;
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userID) {
    try {
      const resetPassword = await ResetPassword.findOne({
        user: userID,
      }).populate("user");
      if (!resetPassword) {
        const error = new Error();
        error.name = "NotFound";
        error.message = "Debe solicitar un cambio de contraseña";
        throw error;
      }
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
          timesChanged: resetPassword.timesChanged,
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
      if (resetPassword.okToChangePassword === false) {
        const error = new Error();
        error.name = "AuthorizationError";
        error.message = `El usuario ${resetPassword.user.email} no se encuentra autorizado para cambiar la contraseña`;
        throw error;
      }
      await resetPassword.save();
      return [resetPassword.user.dni];
    } catch (error) {
      throw error;
    }
  }

  static async passwordChanged(requestId) {
    try {
      const resetPassword = await ResetPassword.findById(requestId);
      if (!resetPassword) {
        const error = new Error();
        error.name = "NotFound";
        error.message = "La solicitud de contraseña no existe";
        throw error;
      }

      resetPassword.changed = true;
      resetPassword.changedAt = new Date();
      resetPassword.okToChangePassword = false;
      resetPassword.save();
      return resetPassword.changedAt;
    } catch (error) {
      throw error;
    }
  }
}
