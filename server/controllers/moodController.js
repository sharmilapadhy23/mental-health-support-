const Mood = require('../models/Mood');

exports.addMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const userId = req.user.uid;

    const existing = await Mood.findOne({ userId, date: new Date().toISOString().split('T')[0] });
    if (existing) {
      existing.mood = mood;
      await existing.save();
      return res.json(existing);
    }

    const newMood = new Mood({ userId, mood, date: new Date() });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMoods = async (req, res) => {
  try {
    const userId = req.user.uid;
    const moods = await Mood.find({ userId }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};