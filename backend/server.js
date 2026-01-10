const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Debugging: Confirm API is reached
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is reachable', url: req.url, path: req.path });
});

// Detailed logging for Vercel troubleshooting
app.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.url} (Path: ${req.path})`);
    next();
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

app.get('/api', (req, res) => {
    res.send('API is running...');
});

app.use(errorHandler);

// Global 404 for API
app.use('/api/*', (req, res) => {
    console.log(`Unmatched API route: ${req.url}`);
    res.status(404).json({ message: `API route ${req.url} not found` });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
