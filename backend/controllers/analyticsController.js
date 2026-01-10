const Task = require('../models/Task');

// @desc    Get Analytics Data
// @route   GET /api/analytics
// @access  Private
const getAnalytics = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });

        // Calculate Totals
        const total = tasks.length;
        const pending = tasks.filter(t => t.status === 'pending').length;
        const inProgress = tasks.filter(t => t.status === 'in-progress').length;
        const completed = tasks.filter(t => t.status === 'completed').length;

        // Top 10 Recent Tasks
        const recentTasks = [...tasks]
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 10);

        // Calculate Completion Trends (Last 7 Days)
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toLocaleDateString();
        }).reverse();

        const completionTrend = last7Days.map(date => {
            const count = tasks.filter(t =>
                t.status === 'completed' &&
                t.completedAt &&
                new Date(t.completedAt).toLocaleDateString() === date
            ).length;
            return { date, count };
        });

        // Status Distribution for Pie Chart
        const statusDistribution = [
            { name: 'Pending', value: pending },
            { name: 'In Progress', value: inProgress },
            { name: 'Completed', value: completed }
        ];

        res.status(200).json({
            summary: { total, pending, inProgress, completed },
            recentTasks,
            completionTrend,
            statusDistribution
        });

    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

module.exports = {
    getAnalytics
};
