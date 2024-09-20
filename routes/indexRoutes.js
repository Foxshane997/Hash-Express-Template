const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Rendering Index Page...");
  res.render("index", { session: req.session });
});

module.exports = router;
