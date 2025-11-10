// seed.js
require('dotenv').config();
const { connectDB, getDB } = require('./config/db');

const lessons = [

  { topic: 'Math', location: 'Hendon', price: 100, space: 5 },
  { topic: 'English', location: 'Colindale', price: 80, space: 5 },
  { topic: 'Science', location: 'Brent Cross', price: 90, space: 5 },
  { topic: 'Art', location: 'Golders Green', price: 95, space: 5 },
  { topic: 'Music', location: 'Camden', price: 70, space: 5 },
  { topic: 'History', location: 'Kilburn', price: 120, space: 5 },
  { topic: 'Geography', location: 'Wembley', price: 85, space: 5 },
  { topic: 'Spanish', location: 'Edgware', price: 75, space: 5 },
  { topic: 'Biology', location: 'Harrow', price: 60, space: 5 },
  { topic: 'Chemistry', location: 'Brent', price: 50, space: 5 },
];

(async () => {
  await connectDB();
  const db = getDB();

  await db.collection('lessons').deleteMany({});
  const result = await db.collection('lessons').insertMany(lessons);
  console.log(`✅ Inserted ${result.insertedCount} lessons`);
  process.exit();
})();
