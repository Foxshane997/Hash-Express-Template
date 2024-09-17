const express = require('express');
const router = express.Router();
const { createUser, verifyUser } = require('../models/userModel');

// Registration route
router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const newUser = await createUser(username, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await verifyUser(email, password);
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
