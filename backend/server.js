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

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

app.get('/api', (req, res) => {
    res.send('API is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
