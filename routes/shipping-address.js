const express = require("express");
const router = express.Router();
const shippingAddressController = require("../controllers/shipping-address");
const { validateJWT } = require("../middlewares/auth.js");
router.get("/:id", validateJWT, async (req, res) => {
  try {
    const shippingAddress =
      await shippingAddressController.getShippingAddressById(req.params.id);
    res.status(200).json(shippingAddress);
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
    let shippingAddresses;
    if (!Object.keys(req.query).length) {
      shippingAddresses =
        await shippingAddressController.fetchAllShippingAddresses();
    } else {
      shippingAddresses =
        await shippingAddressController.getShippingAddressesByParams(req.query);
    }

    res.status(200).json(shippingAddresses);
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
    const createdShippingAddress =
      await shippingAddressController.createShippingAddress(req.body);
    res.status(201).json(createdShippingAddress);
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
    const updatedShippingAddress =
      await shippingAddressController.updateShippingAddress(req.body);
    res.status(200).json(updatedShippingAddress);
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
    const deletedShippingAddress =
      await shippingAddressController.deleteShippingAddressById(req.params.id);
    res.status(200).json(deletedShippingAddress);
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
