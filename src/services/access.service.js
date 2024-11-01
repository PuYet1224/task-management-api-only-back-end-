'use strict';

const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');

class AccessService {
    static signUp = async ({ username, email, password }) => {
        try {
            const existingUser = await UserModel.findOne({ email }).lean();
            if (existingUser) {
                return {
                    code: 'xxxx',
                    message: 'User already registered!'
                };
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = await UserModel.create({
                username,
                email,
                password: passwordHash,
                roles: ['USER']
            });

            if (newUser) {
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                });

                const publicKeyString = publicKey.export({ type: 'pkcs1', format: 'pem' });

                await keyTokenService.createKeyToken({
                    userId: newUser._id,
                    publicKey: publicKeyString
                });

                const tokens = await createTokenPair(
                    { userId: newUser._id, email },
                    publicKeyString,
                    privateKey.export({ type: 'pkcs1', format: 'pem' })
                );

                return {
                    code: 201,
                    metadata: {
                        user: newUser,
                        tokens
                    }
                };
            }

            return {
                code: 200,
                metadata: null
            };
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            };
        }
    };

    static login = async ({ email, password }) => {
        try {
            const user = await UserModel.findOne({ email }).lean();
            if (!user) {
                return {
                    code: 'xxxx',
                    message: 'User not found!'
                };
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {
                    code: 'xxxx',
                    message: 'Invalid password!'
                };
            }
    
            const keyStore = await keyTokenService.findByUserId(user._id);
            if (!keyStore) {
                return {
                    code: 'xxxx',
                    message: 'Key store not found!'
                };
            }
    
            const tokens = await createTokenPair(
                { userId: user._id, email },
                keyStore.publicKey,
                null 
            );
    
            return {
                code: 200,
                metadata: {
                    user,
                    tokens
                }
            };
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            };
        }
    };
}    

module.exports = AccessService;
