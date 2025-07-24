const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const productController = require("../controllers/admin/productController");
const customerController = require("../controllers/admin/customerController");
const orderController = require("../controllers/admin/orderController");

//User

router.get("/users", protect, admin, customerController.getUsers);
router.post("/add", protect, admin, customerController.addUser);
router.put("/user/:id", protect, admin, customerController.editUser);
router.delete("/user/:id", protect, admin, customerController.deleteUser);

//Product Management

router.get("/products", protect, admin, productController.allProducts);
router.post("/addProducts", protect, admin, productController.addProducts);
router.put("/editProduct/:id", protect, admin, productController.editProduct);
router.delete("/deleteProduct/:id", protect, admin, productController.deleteProduct);

//Order Management

router.get("/orders", protect, admin, orderController.orders);
router.put("/order/:id", protect, admin, orderController.editOrder);
router.delete("/order/:id", protect, admin, orderController.deleteOrder);

module.exports = router; 