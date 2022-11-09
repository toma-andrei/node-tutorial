const mongoose = require("mongoose");
const validate = require("validator");

const User = mongoose.model("User", {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validate.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (value.length <= 6) {
        throw new Error("Password must have at least 7 characters");
      }
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password must not contain word 'password'");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
});

module.exports = User;
