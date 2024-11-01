'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');  
const router = express.Router();

router.post('/register', accessController.signUp);  
router.post('/login', accessController.login);     

module.exports = router;
