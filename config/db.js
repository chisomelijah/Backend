const { MongoClient } = require("mongodb");

let db;

async function connectDB() {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db(); 
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err);
    }
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };
