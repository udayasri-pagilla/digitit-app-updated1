require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');

// Ensure models are registered before routes/controllers use them
require('./models/User');
require('./models/Task');

const authRoutes = require('./routes/auth.routes');
const tasksRoutes = require('./routes/tasks.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

// health check
app.get('/health', (req, res) => res.json({ success: true, status: 'ok' }));

// centralized error handler (last)
app.use(errorHandler);

module.exports = app;
