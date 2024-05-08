const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const warrantyCardSchema = new Schema({
  user_id: { type: String, require: true },
  product_id: {
    type: String,
    required: true,
  },
  product_code: {
    type: String,
    default: null,
  },
  start_date: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: String,
    required: true,
  },
  product_history: {
    type: String,
    default: null,
  },
  created_by: { type: String, require: true },
  is_active: { type: Boolean, default: true },
  created_at: {
    type: String,
    default: new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString(),
  },
  updated_at: { type: String, default: null },
}, { versionKey: false });
const WarrantyCard = mongoose.model("WarrantyCard", warrantyCardSchema);

module.exports = WarrantyCard;
