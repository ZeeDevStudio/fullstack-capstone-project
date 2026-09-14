const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../models/db');

// Route handler to filter items by various parameters, including category
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        
        // Build dynamic query object
        let query = {};

        // Task 6 Requirement: Core logic to filter results based on category
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Optional baseline filter for search criteria keywords
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' }; // Case-insensitive keyword matching
        }

        // Execute search query
        const searchResults = await collection.find(query).toArray();
        
        res.status(200).json(searchResults);
    } catch (error) {
        console.error("Error executing query search:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
