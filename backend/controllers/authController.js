const User = require('../models/User');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role === 'admin') {
      return res.json({ message: 'admin', username: username });
    } else {
      return res.json({ message: 'lecturer', username: username });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser };
