const Product = require("../models/product");

const fetchAllProducts = async () => {
  try {
    const products = await Product.find();
    return products.map((product) => ({
      ...product.toObject(),
      id: product._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    return { ...product.toObject(), id: product._id };
  } catch (err) {
    throw err;
  }
};
const getProductsByParams = async (params) => {
  try {
    const products = await Product.find(params);

    return products.map((product) => ({
      ...product.toObject(),
      id: product._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createProduct = async (payload) => {
  try {
    const createdProduct = await Product.create(payload);

    return { ...createdProduct.toObject(), id: createdProduct._id };
  } catch (err) {
    throw err;
  }
};
const updateProduct = async (payload) => {
  if (!payload.id) throw new Error("Missing 'id' property in payload");
  const updatedProduct = await Product.findByIdAndUpdate(payload.id, payload, {
    new: true,
  });
  if (!updatedProduct) throw new Error("Product not found");

  return { ...updatedProduct.toObject(), id: updatedProduct._id };
};
const deleteProductById = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) throw new Error("Product not found");

  return { ...deleteProductById, id: deletedProduct._id };
};

module.exports = {
  fetchAllProducts,
  getProductById,
  getProductsByParams,
  createProduct,
  updateProduct,
  deleteProductById,
};
