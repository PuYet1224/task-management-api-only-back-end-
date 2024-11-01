'use strict'

const mongoose = require('mongoose'); 

const DOCUMENT_NAME = 'Task';
const COLLECTION_NAME = 'Tasks';

// Declare the Schema of the Mongo model
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 500  
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],  
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    }
}, {
    timestamps: true,  
    collection: COLLECTION_NAME
});

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, taskSchema);
