try {
    const app = require('../backend/server');
    module.exports = app;
} catch (error) {
    console.error('Error loading backend/server:', error);
    module.exports = (req, res) => {
        res.status(500).json({ error: 'Internal Server Error (Loading failed)', message: error.message });
    };
}
