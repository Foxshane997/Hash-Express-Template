const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const express = require("express");
const router = express.Router();
const { createUser, verifyUser } = require("../models/userModel");
const authenticateJWT = require("../middleware/authenticateJWT");

// Render the registration page
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle registration form submission
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Registering user information...");
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await createUser(username, email, password);
    console.log("Registration successful!");
    return res.redirect("/login");
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Server error" });
  }
});

// Render the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle login form submission
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await verifyUser(email, password);
    if (user) {
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '7d' });
      console.log("User authorized!")
      console.log("Generated Token:", token);
      req.session.token = token; 
      req.session.username = user.username; 
      req.session.userId = user.id; 
      return res.redirect('/'); 
    } else {
      return res.render('login', { error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Handle logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ message: "Logout failed" });
    }
    res.redirect("/");
  });
});

module.exports = router;
