const Journal = require('../models/Journal');

// Add a new journal entry for the authenticated user
exports.addJournalEntry = async (req, res) => {
  try {
    const { entry } = req.body;
    const userId = req.user.uid;
    if (!entry || entry.trim() === '') {
      return res.status(400).json({ message: 'Journal entry content is required' });
    }

    const newEntry = new Journal({
      userId,
      entry,
      date: new Date(),
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('AddJournalEntry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all journal entries for the authenticated user, sorted latest first
exports.getJournalEntries = async (req, res) => {
  try {
    const userId = req.user.uid;

    const entries = await Journal.find({ userId }).sort({ date: -1 });

    res.json(entries);
  } catch (error) {
    console.error('GetJournalEntries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};