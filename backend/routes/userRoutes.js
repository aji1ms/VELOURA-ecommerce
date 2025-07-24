const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const userController = require("../controllers/user/userController");
const productController = require("../controllers/user/productController");
const cartController = require("../controllers/user/cartController");
const checkoutController = require("../controllers/user/checkoutController");
const orderController = require("../controllers/user/orderController");
const uploadController = require("../controllers/user/uploadController");
const subscribeController = require("../controllers/user/subscribeController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//user Routes

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", protect, userController.profile);

//Products

router.get("/products", productController.loadProducts);
router.get("/products/:id", productController.loadProductsDetails);
router.get("/similar/:id", productController.loadSimilarProducts);
router.get("/best-seller", productController.loadBestSeller);
router.get("/new-arrivals", productController.loadNewArrivals);

//Cart

router.get("/cart", cartController.loadCartPage);
router.post("/addToCart", cartController.addToCart);
router.put("/updateCart", cartController.updateCart);
router.delete("/deleteCartProduct", cartController.deleteCartProduct);
router.post("/mergeCart", protect, cartController.mergeCart);

//Checkout

router.post("/checkout", protect, checkoutController.createCheckout);
router.put("/checkout/:id/pay", protect, checkoutController.payout);
router.post("/checkout/:id/placeOrder", protect, checkoutController.placeOrder);

//Orders

router.get("/orders", protect, orderController.orders);
router.get("/order/:id", protect, orderController.orderDetails);

//Images

router.post("/fileUpload", upload.single("image"), uploadController.fileUpload);

//Subscribe

router.post("/subscribe", protect, subscribeController.subscribe);

module.exports = router;  