// This function could be used later on when admin will be able to post products
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'Thisisveryverysecret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(200).json({ message: 'Token is expired, Log in again'});
    }
};

const isAdmin = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }

    const token = authHeader.split(' ')[1];

     const decoded = jwt.verify(token, 'Thisisveryverysecret');
    req.user = decoded;

    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Requires admin role.' });
    }
};

module.exports = { validateToken, isAdmin };
