const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: { type: Number, require: true },
  is_active: { type: Boolean, default: true },
  created_at: {
    type: String,
    default: new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString(),
  },
  updated_at: { type: String, default: null },
}, { versionKey: false });
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
