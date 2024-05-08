const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const shippingAddressSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
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

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);

module.exports = ShippingAddress;
