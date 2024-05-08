const express = require("express");
const router = express.Router();
const orderProductController = require("../controllers/order-product");
const { validateJWT } = require("../middlewares/auth.js");
router.get("/:id", validateJWT, async (req, res) => {
  try {
    const orderProduct = await orderProductController.getOrderProductById(
      req.params.id
    );
    res.status(200).json(orderProduct);
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
router.get("/", validateJWT, async (req, res) => {
  try {
    let orderProducts;
    if (!Object.keys(req.query).length) {
      orderProducts = await orderProductController.fetchAllOrderProducts();
    } else {
      if (req.query.start_date && req.query.end_date) {
        orderProducts =
          await orderProductController.getOrderProductsByCreatedDates(
            req.query.start_date,
            req.query.end_date
          );
      } else {
        orderProducts = await orderProductController.getOrderProductsByParams(
          req.query
        );
      }
    }

    res.status(200).json(orderProducts);
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
    const createdOrderProduct = await orderProductController.createOrderProduct(
      req.body
    );
    res.status(201).json(createdOrderProduct);
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
    const updatedOrderProduct = await orderProductController.updateOrderProduct(
      req.body
    );
    res.status(200).json(updatedOrderProduct);
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
    const deletedOrderProduct =
      await orderProductController.deleteOrderProductById(req.params.id);
    res.status(200).json(deletedOrderProduct);
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
