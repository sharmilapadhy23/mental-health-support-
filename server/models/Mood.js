const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // Firebase UID
  date: { type: Date, default: Date.now },
  mood: { type: String, required: true }, // Emoji or mood string
});

module.exports = mongoose.model('Mood', moodSchema);