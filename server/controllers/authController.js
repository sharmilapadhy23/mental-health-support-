const User = require('../models/User');

// Sync or create user record on first login
exports.syncUser = async (req, res) => {
  try {
    const { uid, email } = req.user; // uid and email from decoded Firebase token

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error('SyncUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};