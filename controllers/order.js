const Order = require("../models/order");

const fetchAllOrders = async () => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    return orders.map((order) => ({
      ...order.toObject(),
      id: order._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getOrderById = async (id) => {
  try {
    const order = await Order.findById(id);

    if (!order) {
      throw new Error("Shipping address not found");
    }

    return { ...order.toObject(), id: order._id };
  } catch (err) {
    throw err;
  }
};
const getOrdersByParams = async (params) => {
  try {
    const orders = await Order.find(params).sort({ _id: -1 });
    return orders.map((order) => ({
      ...order.toObject(),
      id: order._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createOrder = async (payload) => {
  try {
    const createdOrder = await Order.create(payload);
    return {
      ...createdOrder.toObject(),
      id: createdOrder._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateOrder = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedOrder = await Order.findByIdAndUpdate(payload.id, payload, {
      new: true,
    });
    if (!updatedOrder) throw new Error("Shipping address not found");

    return {
      ...updatedOrder.toObject(),
      id: updatedOrder._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteOrderById = async (id) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) throw new Error("Shipping address not found");

    return {
      ...deletedOrder.toObject(),
      id: deletedOrder._id,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchAllOrders,
  getOrderById,
  getOrdersByParams,
  createOrder,
  updateOrder,
  deleteOrderById,
};
