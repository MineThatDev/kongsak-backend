const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const userSchema = new Schema({
  username: {
    type: String,
    default: null,
    unique: true
  },
  password: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  refresh_token: {
    type: String,
    default: null
  },
  is_active: { type: Boolean, default: true },
  created_at: {
    type: String,
    default: new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString(),
  },
  updated_at: { type: String, default: null },
}, { versionKey: false });

const User = mongoose.model("User", userSchema);

module.exports = User;
