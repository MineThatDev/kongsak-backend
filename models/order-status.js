const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const orderStatusSchema = new Schema({
  order_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: null,
  },
  sequence: {
    type: Number,
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
const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema);

module.exports = OrderStatus;
