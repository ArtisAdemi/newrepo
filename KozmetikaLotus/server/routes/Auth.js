const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const userController = require('../controllers/users');
const { validateToken } = require('../middleware/AuthMiddleware');
const authController = require("../controllers/auth")
// Routes

// Register new User
router.post('/register', userController.registerUser);

// Login User
router.post('/login', userController.loginUser);

router.get('/validateToken', validateToken, (req, res) => {
    // If the middleware passes, the token is valid, and req.user is available
    res.json({ message: "Token is valid", user: req.user });
});

router.get('/getUserData', validateToken, userController.getUserData);

router.get('/decode', validateToken, authController.getDecodedUser)

module.exports = router;