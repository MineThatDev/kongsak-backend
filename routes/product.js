const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { validateJWT } = require("../middlewares/auth.js");

router.get("/:id", productController.getProductById);
router.get("/", productController.getProducts);
router.post("/", validateJWT, productController.createProduct);
router.patch("/:id", validateJWT, productController.updateProduct);
router.delete("/:id", validateJWT, productController.deleteProductById);
module.exports = router;
