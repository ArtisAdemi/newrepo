const db = require('../models');
const { Sequelize, Op } = require('sequelize');
const Subcategory = db.Subcategory;
const Products = db.Products;
const Images = db.Images;
const Users = db.Users;

//  Functions

const getWishlist = async (req, res) => {
    const userId = req.params.userId;
    try {
        // Find the user by their ID and include the associated products through the Wishlist table
        const user = await Users.findByPk(userId, {
            include: [{
                model: Products,
                through: 'Wishlist', // Define the many-to-many relationship through the Wishlist table
                include: [Subcategory, Images],
            }]
        });

        if (user) {
            res.json(user.Products); // Return the products associated with the user
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Function to add a product to the user's wishlist
const addToWishlist = async (req, res) => {
    const userId = req.params.userId;
    const { productId } = req.body;

    try {
        // Find the user and product by their IDs
        const user = await Users.findByPk(userId);
        const product = await Products.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ message: "User or product not found" });
        }

        // Add the product to the user's wishlist
        await user.addProduct(product);

        res.status(200).json({ message: "Product added to wishlist successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const removeFromWishlist = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        // Find the user and product by their IDs
        const user = await Users.findByPk(userId);
        const product = await Products.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ message: "User or product not found" });
        }

        // Remove the product from the user's wishlist
        await user.removeProduct(product);

        res.status(200).json({ message: "Product removed from wishlist successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const checkIfProductIsInWishlist = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        const user = await Users.findByPk(userId);
        const product = await Products.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ message: "User or product not found" });
        }

        const isProductInWishlist = await user.hasProduct(product);

        res.json(isProductInWishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    checkIfProductIsInWishlist,
}