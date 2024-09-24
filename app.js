require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');  // Add JWT for token handling
const indexRoutes = require('./routes/indexRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Add admin route

const app = express();

// Set up session middleware
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Use secure: true in production with HTTPS
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to decode JWT and add user info to session
app.use((req, res, next) => {
  if (req.session.token) {
    try {
      const decoded = jwt.verify(req.session.token, process.env.SECRET_KEY);
      req.session.userId = decoded.id;
      req.session.username = decoded.username;
      req.session.is_admin = decoded.is_admin;  // Add is_admin to session
    } catch (err) {
      console.log('Invalid token');
    }
  }
  next();
});

// Render the index page with login and admin status
app.get('/', (req, res) => {
  const isLoggedIn = !!req.session.token;
  const isAdmin = req.session.is_admin || false;

  res.render('index', { 
    isLoggedIn,
    isAdmin,
    session: req.session
  });
});

// Use routes
app.use('/', indexRoutes);
app.use('/', aboutRoutes);
app.use('/', userRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});