const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../models/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password fields are required" });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        // Task 11 Requirement: Calling the collection's findOne method to locate the user
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: "Invalid email credentials or user does not exist" });
        }

        // Validate password accuracy
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password credentials" });
        }

        // Generate authentication session web token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Authentication successful",
            token: token,
            name: user.name
        });
    } catch (error) {
        console.error("Error authenticating user login request:", error);
        res.status(500).json({ error: "Internal server authentication error" });
    }
});

module.exports = router;
