const OrderStatus = require("../models/order-status");

const fetchAllOrderStatuses = async () => {
  try {
    const orderStatuses = await OrderStatus.find();
    return orderStatuses.map((orderStatus) => ({
      ...orderStatus.toObject(),
      id: orderStatus._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getOrderStatusById = async (id) => {
  try {
    const orderStatus = await OrderStatus.findById(id);

    if (!orderStatus) {
      throw new Error("Shipping address not found");
    }

    return { ...orderStatus.toObject(), id: orderStatus._id };
  } catch (err) {
    throw err;
  }
};
const getOrderStatusesByParams = async (params) => {
  try {
    const orderStatuses = await OrderStatus.find(params);
    return orderStatuses.map((orderStatus) => ({
      ...orderStatus.toObject(),
      id: orderStatus._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createOrderStatus = async (payload) => {
  try {
    const createdOrderStatus = await OrderStatus.create(payload);
    return {
      ...createdOrderStatus.toObject(),
      id: createdOrderStatus._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateOrderStatus = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedOrderStatus = await OrderStatus.findByIdAndUpdate(
      payload.id,
      payload,
      {
        new: true,
      }
    );
    if (!updatedOrderStatus) throw new Error("Shipping address not found");

    return {
      ...updatedOrderStatus.toObject(),
      id: updatedOrderStatus._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteOrderStatusById = async (id) => {
  try {
    const deletedOrderStatus = await OrderStatus.findByIdAndDelete(id);
    if (!deletedOrderStatus) throw new Error("Order status not found");

    return {
      ...deletedOrderStatus.toObject(),
      id: deletedOrderStatus._id,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchAllOrderStatuses,
  getOrderStatusById,
  getOrderStatusesByParams,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatusById,
};
