const express = require('express');
const { getDB } = require('../config/db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { query = '' } = req.query;

        const db = getDB();
        const lessonsCollection = db.collection('lessons');

        const results = await lessonsCollection.find({
            $or: [
                { topic: { $regex: query, $options: "i" } },
                { location: { $regex: query, $options: "i" } },
                { price: { $regex: query, $options: "i" } },
                { space: { $regex: query, $options: "i" } }
            ]
        }).toArray();

        res.json(results);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Search failed' });
    }
});
module.exports = router;
