const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = new User({
    username,
    password
  });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.status(201).json({ token });
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ token });
});

module.exports = router;
