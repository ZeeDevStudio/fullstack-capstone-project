const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectToDatabase } = require('./models/db');
const giftRoutes = require('./routes/giftRoutes');
// Import the search routing module built in Task 6
const searchRoutes = require('./routes/searchRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connection baseline
connectToDatabase().catch(err => {
    console.error("Database connection initialization failed:", err);
});

// App routing declarations
app.use('/api', giftRoutes);

// Task 7 Requirement: Route mounting that serves /api/search
app.use('/api/search', searchRoutes);

// Base health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "ok", message: "GiftLink backend server running seamlessly" });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
