'use strict';

const Task = require('../models/task.model');

exports.createTask = async (userId, taskData) => {
    const task = new Task({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || 'pending',
        createdBy: userId
    });
    return await task.save();
};

exports.getTasks = async (userId) => {
    return await Task.find({ createdBy: userId });
};

exports.updateTask = async (taskId, updatedData) => {
    return await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
};

exports.deleteTask = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};
