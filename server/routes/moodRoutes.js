// routes/moodRoutes.js

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Mood = require('../models/Mood'); // Your Mood model
const router = express.Router();

// Use auth middleware to protect all mood routes
router.use(authMiddleware);

// GET /api/mood - get all moods for logged in user
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    console.error('Get moods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/mood - add a mood entry
router.post('/', async (req, res) => {
  try {
    const { mood } = req.body;

    const newMood = new Mood({
      mood,
      userId: req.user.id,
      date: new Date()
    });

    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    console.error('Add mood error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;