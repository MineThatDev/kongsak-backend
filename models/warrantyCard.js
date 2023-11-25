const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const warrantyCardSchema = new Schema({
  user_id: { type: String, require: true },
  product_id: {
    type: String,
    default: null,
    required: true,
  },
  product_code: {
    type: String,
    default: null,
  },
  start_date: {
    type: String,
    default: null,
    required: true,
  },
  expiry_date: {
    type: String,
    default: null,
    required: true,
  },
  product_history: {
    type: String,
    default: null,
  },
  created_by: { type: String, default: null, require: true },
  is_active: { type: Boolean, default: null, require: true },
});
const WarrantyCard = mongoose.model("WarrantyCard", warrantyCardSchema);

module.exports = WarrantyCard;
