'use strict';

const express = require('express');
const router = express.Router();

const { createTask, getTasks, updateTask, deleteTask } = require('../../controllers/task.controller');

const { verifyTokenMiddleware } = require('../../middlewares/auth.middleware');

router.post('/', verifyTokenMiddleware, createTask);  
router.get('/', verifyTokenMiddleware, getTasks);  
router.put('/:id', verifyTokenMiddleware, updateTask); 
router.delete('/:id', verifyTokenMiddleware, deleteTask);  

module.exports = router;
