// routes/lessons.js
const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

const router = express.Router();

// GET /api/lessons
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const lessons = await db.collection('lessons').find({}).toArray();
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/lessons/:id
router.put('/:id', async (req, res) => {
    try {
        const db = getDB();
        const id = req.params.id.trim();

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid lesson ID format' });
        }

        const filter = { _id: new ObjectId(id) };
        const updates = { $set: req.body };

        const result = await db.collection('lessons').updateOne(filter, updates);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        // Fetch the updated document manually
        const updatedLesson = await db.collection('lessons').findOne(filter);

        res.status(200).json({
            message: 'Lesson updated successfully',
            lesson: updatedLesson,
        });
    } catch (err) {
        console.error('PUT /lessons/:id error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
