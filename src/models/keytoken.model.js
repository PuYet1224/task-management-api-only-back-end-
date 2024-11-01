'use strict'

const { Schema, model } = require('mongoose');
const mongoose = require('mongoose'); 

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,  
        required: true,
        ref: 'User'
    },
    publicKey: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: [String], 
        default: []
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);
