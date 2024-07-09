const jwt = require('jsonwebtoken');
const { validateToken } = require('../middleware/AuthMiddleware');

// Function to get the decoded user information from the token
const getDecodedUser = (req, res) => {
    try {
        validateToken(req, res, () => {
            if (req.user){
                let decodedUser = req.user;
                res.json(decodedUser); // Return the decoded user information
            }
            res.json({message: "You are not logged in!"});
        });
    } catch (error) {
        res.status(400).json({ message: 'Error decoding token' });
    }
}

module.exports = {
    getDecodedUser
};