'use strict';

const jwt = require('jsonwebtoken');
const keyTokenService = require('../services/keyToken.service');

exports.verifyTokenMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.decode(token);  
        console.log('Decoded token:', decoded);

        const keyStore = await keyTokenService.findByUserId(decoded.userId); 
        if (!keyStore) {
            return res.status(401).json({ message: 'Public key not found!' });
        }

        const publicKey = keyStore.publicKey; 
        const verified = jwt.verify(token, publicKey, { algorithms: ['RS256'] }); 
        req.userId = verified.userId;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);  
        return res.status(400).json({ message: 'Invalid token.' });
    }
};