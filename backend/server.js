const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
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

// Define API routes
const router = express.Router();
router.use('/tasks', require('./routes/taskRoutes'));
router.use('/auth', require('./routes/authRoutes'));
router.use('/analytics', require('./routes/analyticsRoutes'));

// Mount router on both /api and root to handle different Vercel routing behaviors
app.use('/api', router);
app.use('/', (req, res, next) => {
    // If it's not a static file request (handled elsewhere), try the router
    if (!req.path.includes('.')) {
        return router(req, res, next);
    }
    next();
});

app.get('/api-status', (req, res) => {
    res.json({ status: 'running', timestamp: new Date(), url: req.url });
});

app.use(errorHandler);

// Global 404 for API
app.use('/api/*', (req, res) => {
    console.log(`Unmatched API route: ${req.url}`);
    res.status(404).json({ message: `API route ${req.url} not found` });
});

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
