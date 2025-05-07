const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // Firebase UID
  date: { type: Date, default: Date.now },
  entry: { type: String, required: true },
});

module.exports = mongoose.model('Journal', journalSchema);