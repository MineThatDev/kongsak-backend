const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderProductSchema = new Schema({
  order_id: {
    type: String,
    default: null,
    required: true,
  },
  product_id: {
    type: String,
    default: null,
    required: true,
  },
  quantity: {
    type: Number,
    default: null,
    required: true,
  },
  is_active: { type: Boolean, default: null, require: true },
});
const OrderProduct = mongoose.model("OrderProduct", orderProductSchema);

module.exports = OrderProduct;
