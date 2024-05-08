const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { validateJWT } = require("../middlewares/auth.js");
router.get("/:id", async (req, res) => {
  try {
    const product = await productController.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
router.get("/", async (req, res) => {
  try {
    let products;
    if (req?.query) {
      products = await productController.getProductsByParams(req.query);
    } else {
      products = await productController.fetchAllProducts();
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
router.post("/", validateJWT, async (req, res) => {
  try {
    const createdProduct = await productController.createProduct(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
router.patch("/:id", validateJWT, async (req, res) => {
  try {
    const updatedProduct = await productController.updateProduct(req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
router.delete("/:id", validateJWT, async (req, res) => {
  try {
    const deletedProduct = await productController.deleteProductById(
      req.params.id
    );
    res.status(200).json(deletedProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
module.exports = router;
