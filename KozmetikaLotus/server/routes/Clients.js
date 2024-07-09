const express = require('express');
const router = express.Router();
const clientsController = require("../controllers/clients");

// Routes

// Get all clients
router.get('/', clientsController.getClients);






module.exports = router;