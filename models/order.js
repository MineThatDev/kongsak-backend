const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new Schema({
  tracking_number: {
    type: String,
    default: null,
  },
  tracking_url: {
    type: String,
    default: null,
  },
  order_number: {
    type: String,
    default: null,
  },
  delivered_by: {
    type: String,
    default: null,
  },
  delivery_status: {
    type: String,
    default: null,
  },
  shipping_address_id: { type: String, default: null, require: true },
  user_id: { type: String, default: null, require: true },
  created_by: { type: String, default: null, require: true },
  is_active: { type: Boolean, default: null, require: true },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
