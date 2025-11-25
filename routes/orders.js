// routes/orders.js
const express = require('express')
const { getDB } = require('../config/db')

const router = express.Router()

// POST /api/orders — create new order
router.post('/', async (req, res) => {
  try {
    const db = getDB()
    const { name, phone, lessons } = req.body

    // Basic validation
    if (!name || !phone || !Array.isArray(lessons) || lessons.length === 0) {
      return res.status(400).json({ error: 'Invalid order data' })
    }

    // Prepare order object
   const order = {
      name,
      phone,
      lessons: lessons.map(l => ({
        lessonId: l.lessonId ? new ObjectId(l.lessonId) : null,
        topic: l.topic,
        price: l.price
      })),
      createdAt: new Date()
    }

    // Insert order into "orders" collection
    const result = await db.collection('orders').insertOne(order)

    // Optionally update lesson spaces
    for (const lesson of lessons) {
      if (lesson.lessonId) {
        await db.collection('lessons').updateOne(
          { _id: new (lesson.lessonId) },
          { $inc: { space: -1 } } // decrease available space by 1
        )
      }
    }

    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.insertedId
    })
  } catch (err) {
    console.error('❌ Error creating order:', err)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

module.exports = router
