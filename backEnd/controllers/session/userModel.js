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
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minlength: [10, "Password must be at least 10 characters long"],
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
