const OrderProduct = require("../models/order-product");

const fetchAllOrderProducts = async () => {
  try {
    const orderProducts = await OrderProduct.find();
    return orderProducts.map((orderProduct) => ({
      ...orderProduct.toObject(),
      id: orderProduct._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getOrderProductById = async (id) => {
  try {
    const orderProduct = await OrderProduct.findById(id);

    if (!orderProduct) {
      throw new Error("Shipping address not found");
    }

    return { ...orderProduct.toObject(), id: orderProduct._id };
  } catch (err) {
    throw err;
  }
};
const getOrderProductsByParams = async (params) => {
  try {
    const orderProducts = await OrderProduct.find(params);
    return orderProducts.map((orderProduct) => ({
      ...orderProduct.toObject(),
      id: orderProduct._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getOrderProductsByCreatedDates = async (startDate, endDate) => {
  try {
    const orderProducts = await OrderProduct.find({
      created_at: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return orderProducts.map((orderProduct) => ({
      ...orderProduct.toObject(),
      id: orderProduct._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createOrderProduct = async (payload) => {
  try {
    const createdOrderProduct = await OrderProduct.create(payload);
    return {
      ...createdOrderProduct.toObject(),
      id: createdOrderProduct._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateOrderProduct = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedOrderProduct = await OrderProduct.findByIdAndUpdate(
      payload.id,
      payload,
      { new: true }
    );
    if (!updatedOrderProduct) throw new Error("Shipping address not found");

    return {
      ...updatedOrderProduct.toObject(),
      id: updatedOrderProduct._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteOrderProductById = async (id) => {
  try {
    const deletedOrderProduct = await OrderProduct.findByIdAndDelete(id);
    if (!deletedOrderProduct) throw new Error("Shipping address not found");

    return {
      ...deletedOrderProduct.toObject(),
      id: deletedOrderProduct._id,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchAllOrderProducts,
  getOrderProductById,
  getOrderProductsByParams,
  createOrderProduct,
  updateOrderProduct,
  deleteOrderProductById,
  getOrderProductsByCreatedDates,
};
