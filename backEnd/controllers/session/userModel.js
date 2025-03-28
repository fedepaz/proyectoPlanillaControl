import { Schema, model } from "mongoose";

const userSchema = new Schema({
  dni: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{8}$/.test(v.toString());
      },
      message: (props) =>
        `${props.value} is not a valid DNI! It must be exactly 8 digits.`,
    },
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: [9, "Password must be at least 10 characters long"],
  },
  role: { type: String, required: true },
  oficialId: {
    type: Schema.Types.ObjectId,
    ref: "Oficial",
    required: true,
    unique: true,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const User = model("User", userSchema);

const resetPasswordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  okToChangePassword: { type: Boolean, required: true, default: false },
  timesAsked: { type: Number, required: true },
  askedAtLast: { type: Date, required: true },
  changed: { type: Boolean, required: false, default: false },
  changedAt: { type: Date, required: false },
});

resetPasswordSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const ResetPassword = model("ResetPassword", resetPasswordSchema);
