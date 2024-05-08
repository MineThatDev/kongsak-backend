const express = require("express");
const router = express.Router();
const orderStatusController = require("../controllers/order-status");
const { validateJWT } = require("../middlewares/auth.js");
router.get("/:id", validateJWT, async (req, res) => {
  try {
    const orderStatus = await orderStatusController.getOrderStatusById(
      req.params.id
    );
    res.status(200).json(orderStatus);
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
    let orderStatuses;
    if (!Object.keys(req.query).length) {
      orderStatuses = await orderStatusController.fetchAllOrderStatuses();
    } else {
      orderStatuses = await orderStatusController.getOrderStatusesByParams(
        req.query
      );
    }

    res.status(200).json(orderStatuses);
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
    const createdOrderStatus = await orderStatusController.createOrderStatus(
      req.body
    );
    res.status(201).json(createdOrderStatus);
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
    const updatedOrderStatus = await orderStatusController.updateOrderStatus(
      req.body
    );
    res.status(200).json(updatedOrderStatus);
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
    const deletedOrderStatus =
      await orderStatusController.deleteOrderStatusById(req.params.id);
    res.status(200).json(deletedOrderStatus);
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
