const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const db = require("../models");
const Users = db.Users;
const validateToken = require('../middleware/AuthMiddleware')
const { giveDiscount } = require('./discount');

// Controller functions

// Get users
const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get UserById
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Users.findByPk(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Register User

const registerUser = async (req, res) => {
    const { email, firstName, lastName, phoneNumber, role, password } = req.body;
    try {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in database
        const newUser = await Users.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            role: role,
            password: hashedPassword,
            discount: 10,
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// login
const loginUser = async (req, res) => {
    // getting email and pw from json body
    const { email, password } = req.body;

    try {
        // fetch user by email
        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // hash user password and check if it is the same as the on saved in DB
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid Password" })
        }

        // Assing a jwt token for user if credentials are correct
        // In JWT we save useful data for user
        const token = jwt.sign({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, discount: user.discount, phoneNumber: user.phoneNumber, role: user.role }, "Thisisveryverysecret", { expiresIn: '12h' });
        res.status(200).json({ token: token, user: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { email, firstName, lastName, phoneNumber, role, password, currentPassword } = req.body;

    try {
        // Find User by id
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if current password matches the user's password
        if (currentPassword) {
            const passwordMatch = await bcrypt.compare(currentPassword, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }
        }

        // Hash the password if it's provided
        let hashedPassword = user.password; // Default to the existing password
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Construct updated user object with only non-empty fields
        const updatedUser = {
            email: email || user.email,
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            phoneNumber: phoneNumber || user.phoneNumber,
            role: role || user.role,
        };

        // Add password field only if it's provided
        if (password) {
            updatedUser.password = hashedPassword;
        }

        // Update the user details
        await user.update(updatedUser);

        return res.status(200).json({ message: "User updated successfully", user }); // Return the response here

    } catch (err) {
        return res.status(500).json({ error: err.message }); // Return the error response
    }
};

const getUserData = async (req, res) => {
    const userId = req.user.id
    try {
        try {
            const user = await Users.findByPk(userId, {
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },  // Exclude sensitive fields
            });
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

// export controller functions
module.exports = {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
    updateUser,
    getUserData,
};
