const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const shippingAddressSchema = new Schema({
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
  phone: {
    type: String,
    default: null,
    required: true,
  },
  address: {
    type: String,
    default: null,
    required: true,
  },
  user_id: {
    type: String,
    default: null,
    required: true,
  },
  is_active: { type: Boolean, default: null, require: true },
});

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);

module.exports = ShippingAddress;
