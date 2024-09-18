const express = require('express');
const path = require('path');
const router = express.Router();

// Index route
router.get('/', (req, res) => {
  console.log("Rendering Index Page...")
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
