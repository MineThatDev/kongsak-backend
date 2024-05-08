const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const { validateJWT } = require("../middlewares/auth.js");
router.get("/:id", validateJWT, async (req, res) => {
  try {
    const order = await orderController.getOrderById(req.params.id);
    res.status(200).json(order);
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
    let orders;
    if (req?.query) {
      orders = await orderController.getOrdersByParams(req.query);
    } else {
      orders = await orderController.fetchAllOrders();
    }

    res.status(200).json(orders);
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
    const createdOrder = await orderController.createOrder(req.body);
    res.status(201).json(createdOrder);
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
    const updatedOrder = await orderController.updateOrder(req.body);
    res.status(200).json(updatedOrder);
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
    const deletedOrder = await orderController.deleteOrderById(req.params.id);
    res.status(200).json(deletedOrder);
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
