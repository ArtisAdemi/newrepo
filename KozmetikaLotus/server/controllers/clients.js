const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const db = require("../models");
const Clients = db.Clients
const Users = db.Users
 
const createClient = async (userId) => {
    try{
        const [client, created] = await Clients.findOrCreate({
            where: {userId: userId},
            default: {userId: userId}
        });

        return client;
    } catch (err) {
        res.status(500).json({ error: err.message });
        throw new Error("Error finding or creating client");
    }
}
// Get all clients
const getClients = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    try {
        const {count, rows} = await Clients.findAndCountAll({
            limit: limit,
            distinct: true,
            include: [{
                model: Users,
                attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'role'] }
            }]
        });

        const totalPages = Math.ceil(count / limit);

        if(!rows){
            return res.status(404).json({ message: "Clients not found" })
        }

        res.status(200).json({
            clients: rows,
            totalClients: count,
            totalPages: totalPages,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    createClient,
    getClients
};