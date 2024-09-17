const bcrypt = require('bcrypt');
const pool = require('../db');

const saltRounds = 10;

// Create a new user with hashed password
const createUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    return result.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error('Error creating user');
  }
};

// Verify user password
const verifyUser = async (email, password) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw new Error('Error verifying user');
  }
};

module.exports = {
  createUser,
  verifyUser,
};
