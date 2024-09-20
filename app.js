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
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Render the index page with login status
app.get('/', (req, res) => {
  const isLoggedIn = req.session.token ? true : false;
  res.render('index', { 
    isLoggedIn,
    session: req.session // Pass the session object here
  });
});

// Use routes
app.use('/', indexRoutes);
app.use('/', aboutRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
