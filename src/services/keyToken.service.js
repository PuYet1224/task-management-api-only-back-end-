'use strict';

const keyTokenModel = require('../models/keytoken.model');

class KeyTokenService {

    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString();
            const tokens = await keyTokenModel.create({
                user: userId,
                publicKey: publicKeyString
            });

            return tokens ? publicKeyString : null;
        } catch (error) {
            console.error('Error saving key token:', error);
            return error;
        }
    }

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: userId }).lean();
    }
}

module.exports = KeyTokenService;
