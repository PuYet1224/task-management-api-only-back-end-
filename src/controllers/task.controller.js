'use strict';

const TaskService = require('../services/task.service');

exports.createTask = async (req, res) => {
    try {
        const task = await TaskService.createTask(req.userId, req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await TaskService.getTasks(req.userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await TaskService.updateTask(req.params.id, req.body);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await TaskService.deleteTask(req.params.id);
        res.status(204).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
