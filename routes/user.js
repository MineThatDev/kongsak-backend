const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const {
  validateJWT,
  validateJWTRefreshToken,
} = require("../middlewares/auth.js");
router.post("/registration/", userController.registration);
router.post("/login/", userController.login);
router.post(
  "/refresh-token/",
  validateJWTRefreshToken,
  userController.refreshToken
);
router.get("/check-existing-account/", userController.checkExistingAccount);
router.get("/:id", validateJWT, userController.getUserById);
router.get("/", validateJWT, userController.getUsers);
router.post("/", userController.createUser);
router.patch("/:id", validateJWT, userController.updateUser);
router.delete("/:id", validateJWT, userController.deleteUserById);
module.exports = router;
