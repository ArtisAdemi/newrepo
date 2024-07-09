const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/AuthMiddleware")
const orderController = require('../controllers/orders');

// Routes

// Get all orders
router.get('/', orderController.getOrders);

// Get OrderById
router.get('/:id', orderController.getOrderById);

//Update an Order --- In this case, i made it so the status only can change
router.put('/:id', orderController.updateOrder);






module.exports = router;