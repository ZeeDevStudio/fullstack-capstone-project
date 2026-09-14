const express = require('express');
const router = express.Router();
// Import the required database connector method from Task 4
const { connectToDatabase } = require('../models/db'); 
const { ObjectId } = require('mongodb');

// Route 1: Serve "/api/gifts" to retrieve all items
router.get('/gifts', async (req, res) => {
    try {
        // Connect using the required method
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        
        const gifts = await collection.find({}).toArray();
        res.status(200).json(gifts);
    } catch (error) {
        console.error("Error fetching gifts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route 2: Serve "/api/gifts/:id" to retrieve a specific item detail
router.get('/gifts/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const giftId = req.params.id;

        // Find item matching the ID string or ObjectId depending on seed data structure
        let query = {};
        if (ObjectId.isValid(giftId)) {
            query = { _id: new ObjectId(giftId) };
        } else {
            query = { id: giftId }; // Backwards compatibility with standard text IDs
        }

        const gift = await collection.findOne(query);

        if (!gift) {
            return res.status(404).json({ error: "Gift item not found" });
        }

        res.status(200).json(gift);
    } catch (error) {
        console.error("Error fetching gift details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
