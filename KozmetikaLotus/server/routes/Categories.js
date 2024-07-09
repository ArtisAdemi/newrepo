const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');

// Routes

// Get all categories
router.get('/', categoryController.getCategories);

// Get CategoryById
//router.get('/:id', categoryController.getCategoryById);

// Get Subcategories
router.get('/:id/subcategories', categoryController.getSubCategories)

// Post a category
router.post('/', categoryController.registerCategory);





module.exports = router;