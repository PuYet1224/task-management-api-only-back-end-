'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const app = express();

// Use middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database connection
require('./dbs/init.mongodb');

// Define routes
const authRoutes = require('./routes/auth');  
const taskRoutes = require('./routes/task'); 

app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/tasks', taskRoutes);

module.exports = app;
