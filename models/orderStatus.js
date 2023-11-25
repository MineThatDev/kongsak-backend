const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderStatusSchema = new Schema({
  order_id: {
    type: String,
    default: null,
    required: true,
  },
  title: {
    type: String,
    default: null,
    required: true,
  },
  status: {
    type: String,
    default: null,
  },
  sequence: {
    type: Number,
    default: null,
    required: true,
  },
  is_active: { type: Boolean, default: null, require: true },
});
const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema);

module.exports = OrderStatus;
