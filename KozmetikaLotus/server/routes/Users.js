const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware")
const userController = require('../controllers/users');
const wishlistController = require('../controllers/wishlist');
const orderController = require('../controllers/orders');
const { giveDiscount } = require('../controllers/discount');

// Routes

// Get all users
router.get('/', userController.getUsers);

// ORDERS
router.post("/orders", authMiddleware.validateToken, orderController.registerOrder)

router.put("/discount", authMiddleware.isAdmin, giveDiscount)

router.delete("/orders/:id", authMiddleware.validateToken, orderController.deleteOrder)

router.get("/orders", authMiddleware.validateToken, orderController.getUserOrders)
// END OF ORDER ROUTES

// Get UserById
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', authMiddleware.validateToken, userController.updateUser);


// Protected Routes
// Get user's wishlist
router.get("/:userId/wishlist",authMiddleware.validateToken, wishlistController.getWishlist)

router.get("/:userId/wishlist/:productId",authMiddleware.validateToken, wishlistController.checkIfProductIsInWishlist)

// Add to wishlist
router.post("/:userId/wishlist",authMiddleware.validateToken, wishlistController.addToWishlist)

// Remove from wishlist
router.delete("/:userId/wishlist/:productId",authMiddleware.validateToken, wishlistController.removeFromWishlist)






module.exports = router;