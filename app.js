const express = require('express');
const path = require('path');
const indexRoutes = require('./routes/indexRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Use middleware to parse JSON bodies
app.use(express.json());

// Use the routes
app.use('/', indexRoutes);
app.use('/', aboutRoutes);
app.use('/api', userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
