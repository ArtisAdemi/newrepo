const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const { validateToken } = require("../middleware/AuthMiddleware");
const fileUpload = require("../helpers/fileUpload");

// Routes

// Register Product
router.post("/", validateToken, fileUpload, productsController.registerProduct);

// RemindMe when in stock
router.post("/remindWhenInStock", validateToken, productsController.remindMeWhenInStock);

router.get("/remindWhenInStock/:productId", validateToken, productsController.remindMeForThisProduct);

// Update Product
router.put("/:id", validateToken, fileUpload, productsController.updateProduct);

// Get Product by ID
router.get("/productPerCategory", productsController.getUniqueProductPerCategory);

// Get Brands
router.get("/brands", productsController.getBrands);
// Get Products
router.get("/", productsController.getProducts);
router.get("/best-selling", productsController.getBestSellingProducts);

// Get Product by ID
router.get("/:id", productsController.getProductById);

// Delete Product
router.delete("/:id", productsController.deleteProduct);

// Get product images
router.get("/:id/images", productsController.getProductImages);

// Update product
router.put("/:id", validateToken, productsController.updateProduct);

// Delete product
router.delete("/:id", validateToken, productsController.deleteProduct);

module.exports = router;
