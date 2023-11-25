const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const fileSchema = new Schema({
  key_ref: { type: String, default: null, require: true },
  filename: { type: String, default: null, require: true },
  content: { type: Buffer, default: null, require: true },
  origin: { type: String , default: null, require: true },
  sub_origin: { type: String, default: null },
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
