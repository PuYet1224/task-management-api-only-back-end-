'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        if (!privateKey) {
            console.warn('Private key is missing, skipping token creation with private key');
            return null;
        }
        // Access token
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        });

        // Refresh token
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        });

        // Verify token
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`Error verifying token::`, err);
            } else {
                console.log('Decode verify token::', decode);
            }
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error creating token pair:', error);
        throw error;
    }
};

module.exports = { createTokenPair };
