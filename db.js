const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection URI from environment variables
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = 'giftlinkDB';

let dbInstance = null;
let client = null;

async function connectToDatabase() {
    if (dbInstance) return dbInstance;

    client = new MongoClient(url);

    try {
        // Task 4 Requirement: Connection line using await client.connect()
        await client.connect();
        console.log("Successfully connected to MongoDB server");

        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (error) {
        console.error("Failed to connect to MongoDB database:", error);
        throw error;
    }
}

module.exports = {
    connectToDatabase,
    getDb: () => dbInstance
};
