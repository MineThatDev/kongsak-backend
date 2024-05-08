const express = require("express");
const router = express.Router();
const warrantyCardController = require("../controllers/warranty-card");
const { validateJWT } = require("../middlewares/auth.js");
router.get("/:id", validateJWT, async (req, res) => {
  try {
    const warrantyCard = await warrantyCardController.getWarrantyCardById(
      req.params.id
    );
    res.status(200).json(warrantyCard);
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
    let warrantyCards;
    if (req?.query) {
      warrantyCards = await warrantyCardController.getWarrantyCardsByParams(
        req.query
      );
    } else {
      warrantyCards = await warrantyCardController.fetchAllWarrantyCards();
    }

    res.status(200).json(warrantyCards);
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
    const createdWarrantyCard = await warrantyCardController.createWarrantyCard(
      req.body
    );
    res.status(201).json(createdWarrantyCard);
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
    const updatedWarrantyCard = await warrantyCardController.updateWarrantyCard(
      req.body
    );
    res.status(200).json(updatedWarrantyCard);
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
    const deletedWarrantyCard =
      await warrantyCardController.deleteWarrantyCardById(req.params.id);
    res.status(200).json(deletedWarrantyCard);
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
