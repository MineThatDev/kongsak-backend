const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const fileSchema = new Schema({
  key_ref: { type: String, require: true },
  filename: { type: String, require: true },
  content: { type: Buffer, require: true },
  origin: { type: String, require: true },
  sub_origin: { type: String, default: null },
  is_active: { type: Boolean, default: true },
  created_at: {
    type: String,
    default: new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString(),
  },
  updated_at: { type: String, default: null },
}, { versionKey: false });

const File = mongoose.model("File", fileSchema);
module.exports = File;
