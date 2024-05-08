const ShippingAddress = require("../models/shipping-address");

const fetchAllShippingAddresses = async () => {
  try {
    const shippingAddresses = await ShippingAddress.find();
    return shippingAddresses.map((address) => ({
      ...address.toObject(),
      id: address._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getShippingAddressById = async (id) => {
  try {
    const shippingAddress = await ShippingAddress.findById(id);

    if (!shippingAddress) {
      throw new Error("Shipping address not found");
    }

    return { ...shippingAddress.toObject(), id: shippingAddress._id };
  } catch (err) {
    throw err;
  }
};
const getShippingAddressesByParams = async (params) => {
  try {
    const shippingAddresses = await ShippingAddress.find(params);
    return shippingAddresses.map((address) => ({
      ...address.toObject(),
      id: address._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createShippingAddress = async (payload) => {
  try {
    const createdShippingAddress = await ShippingAddress.create(payload);
    return {
      ...createdShippingAddress.toObject(),
      id: createdShippingAddress._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateShippingAddress = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedShippingAddress = await ShippingAddress.findByIdAndUpdate(
      payload.id,
      payload,
      { new: true }
    );
    if (!updatedShippingAddress) throw new Error("Shipping address not found");

    return {
      ...updatedShippingAddress.toObject(),
      id: updatedShippingAddress._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteShippingAddressById = async (id) => {
  try {
    const deletedShippingAddress = await ShippingAddress.findByIdAndDelete(id);
    if (!deletedShippingAddress) throw new Error("Shipping address not found");

    return {
      ...deletedShippingAddress.toObject(),
      id: deletedShippingAddress._id,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchAllShippingAddresses,
  getShippingAddressById,
  getShippingAddressesByParams,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddressById,
};
