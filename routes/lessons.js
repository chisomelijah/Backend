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
}),

app.get('/search', async (req, res) => {
  try {
    const query = req.query.query;

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
