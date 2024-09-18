const express = require('express');
const router = express.Router();
const { createUser, verifyUser } = require('../models/userModel');

// Render the registration page
router.get('/register', (req, res) => {
  console.log("Rendering Register Page...")
  res.render('register');
});

// Handle registration form submission
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = await createUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Render the login page
router.get('/login', (req, res) => {
  console.log("Rendering Login Page..")
  res.render('login');
});

// Handle login form submission
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await verifyUser(email, password);
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
