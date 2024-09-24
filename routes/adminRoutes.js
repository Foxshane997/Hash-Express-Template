const express = require('express');
const router = express.Router();
const checkAdmin = require('../middleware/adminMiddleware');

// Admin dashboard
router.get('/', checkAdmin, (req, res) => {
  res.render('admin', { 
    message: 'Welcome to the Admin Panel', 
    session: req.session 
  });
});

module.exports = router;
