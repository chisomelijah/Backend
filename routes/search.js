// routes/search.js
const express = require('express')
const { getDB } = require('../config/db')

const router = express.Router()

// GET /api/search?q=...
router.get('/', async (req, res) => {
    try {
        const db = getDB()
        const q = (req.query.q || req.query.query || '').trim()

        // If no query provided, just return all lessons
        if (!q) {
            const allLessons = await db.collection('lessons').find({}).toArray()
            return res.json(allLessons)
        }

        const isNumeric = /^[0-9]+$/.test(q)
        const numericValue = isNumeric ? Number(q) : null

        // Full-text style search across topic, location, and (optionally) numeric fields

        const filter = {
            $or: [
                { topic: { $regex: q, $options: 'i' } },
                { location: { $regex: q, $options: 'i' } },
                // Price/space are numbers in your seed, so only include if query is numeric
                ...(isNumeric
                    ? [
                        { price: numericValue },
                        { space: numericValue }
                    ]
                    : [])
            ]
        }

        const results = await db.collection('lessons').find(filter).toArray()
        res.json(results)
    } catch (err) {
        console.error('❌ Search error:', err)
        res.status(500).json({ error: 'Search failed' })
    }
})

module.exports = router
