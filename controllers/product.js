const Product = require("../models/product");

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json({ ...product.toObject(), id: product._id });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    delete req.query["page"];
    delete req.query["limit"];
    const skip = (page - 1) * limit;
    const products = await Product.find(req.query)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Product.find(req.query).countDocuments();
    return res.status(200).json({
      total: parseInt(total),
      page: parseInt(page),
      skip: parseInt(skip),
      limit: parseInt(limit),
      data: products.map((product) => {
        return { ...product.toObject(), id: product._id };
      }),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const createdProduct = await Product.create(req.body);

    return res
      .status(201)
      .json({ ...createdProduct.toObject(), id: createdProduct._id });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ ...updatedProduct.toObject(), id: updatedProduct._id });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ ...deleteProductById, id: deletedProduct._id });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProductById,
};
