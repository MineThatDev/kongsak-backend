const WarrantyCard = require("../models/warranty-card");

const fetchAllWarrantyCards = async () => {
  try {
    const warrantyCard = await WarrantyCard.find().sort({ _id: -1 });
    return warrantyCard.map((wc) => ({
      ...wc.toObject(),
      id: wc._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getWarrantyCardById = async (id) => {
  try {
    const warrantyCard = await WarrantyCard.findById(id);

    if (!warrantyCard) {
      throw new Error("Shipping address not found");
    }

    return { ...warrantyCard.toObject(), id: warrantyCard._id };
  } catch (err) {
    throw err;
  }
};
const getWarrantyCardsByParams = async (params) => {
  try {
    const warrantyCards = await WarrantyCard.find(params).sort({ _id: -1 });
    return warrantyCards.map((wc) => ({
      ...wc.toObject(),
      id: wc._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createWarrantyCard = async (payload) => {
  try {
    const createdWarrantyCard = await WarrantyCard.create(payload);
    return {
      ...createdWarrantyCard.toObject(),
      id: createdWarrantyCard._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateWarrantyCard = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedWarrantyCard = await WarrantyCard.findByIdAndUpdate(
      payload.id,
      payload,
      { new: true }
    );
    if (!updatedWarrantyCard) throw new Error("Shipping address not found");

    return {
      ...updatedWarrantyCard.toObject(),
      id: updatedWarrantyCard._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteWarrantyCardById = async (id) => {
  try {
    const deletedWarrantyCard = await WarrantyCard.findByIdAndDelete(id);
    if (!deletedWarrantyCard) throw new Error("Shipping address not found");

    return {
      ...deletedWarrantyCard.toObject(),
      id: deletedWarrantyCard._id,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchAllWarrantyCards,
  getWarrantyCardById,
  getWarrantyCardsByParams,
  createWarrantyCard,
  updateWarrantyCard,
  deleteWarrantyCardById,
};
