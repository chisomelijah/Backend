// routes/orders.js
const express = require('express');
const { getDB } = require('../config/db');

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { name, phone, lessonIDs, numberOfSpaces } = req.body;

    if (!name || !phone || !Array.isArray(lessonIDs) || !numberOfSpaces) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = getDB();
    const result = await db.collection('orders').insertOne({
      name,
      phone,
      lessonIDs: lessonIDs.map(id => new (id)),
      numberOfSpaces,
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'Order saved', orderId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
