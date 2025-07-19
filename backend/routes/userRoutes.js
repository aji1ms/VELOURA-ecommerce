const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const userController = require("../controllers/user/userController");

//user Routes

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", protect, userController.profile);

module.exports = router; 