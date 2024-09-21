require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const indexRoutes = require('./routes/indexRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Render the index page with login status
app.get('/', (req, res) => {
  const isLoggedIn = req.session.token ? true : false;
  res.render('index', { 
    isLoggedIn,
    session: req.session
  });
});

// Use routes
app.use('/', indexRoutes);
app.use('/', aboutRoutes);
app.use('/', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Set the port and environment
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${ENV} mode`);
});
