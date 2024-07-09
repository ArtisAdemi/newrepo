const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const db = require("../models");
const Clients = db.Clients
const Users = db.Users
 
const giveDiscount = async (req, res) => {
    const { userId, discount } = req.body;
    try {
        const user = await Users.findByPk(userId);
        
        user.discount = parseInt(discount);
        await user.save();
        
        res.status(200).json({ message: "Discount given successfully" });
    } catch (err) {
        res.json({ error: err.message });
    }
}


const resetDiscount = async (userId) => {
    try{
        const user = await Users.findByPk(userId);
        

        user.discount = 0
        await user.save();
        } catch (err) {
        res.status(500).json({ error: err.message });
        throw new Error("Error reseting discount");
    }
}


module.exports = {
    giveDiscount,
    resetDiscount
};