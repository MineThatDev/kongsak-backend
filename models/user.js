const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    default: null,
    required: true,
  },
  first_name: {
    type: String,
    default: null,
    required: true,
  },
  last_name: {
    type: String,
    default: null,
    required: true,
  },
  telephone: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: null,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
  login_method: {
    type: String,
    default: null,
    required: true,
  },
  is_active: { type: Boolean, default: null, require: true },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
