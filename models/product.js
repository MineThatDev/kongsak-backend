const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    default: null,
    required: true,
  },
  model: {
    type: String,
    default: null,
    required: true,
  },
  brand: {
    type: String,
    default: null,
    required: true,
  },
  category: {
    type: String,
    default: null,
    required: true,
  },
  price: { type: Number, default: null, require: true },
  is_active: { type: Boolean, default: null, require: true },
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
