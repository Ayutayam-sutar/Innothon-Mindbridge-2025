const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const User = require('./models/user');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Registration endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' }); // Changed message to msg for consistency
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    // Brick 1: Hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    // Brick 2: Return a JWT
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ... after your app.post('/api/auth/register', ...) endpoint

// @route   POST api/auth/login
// @desc    Authenticate user & get token (Login)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check if password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // If they match, create and return a token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ... after your login endpoint

// @route   GET api/auth/user
// @desc    Get logged-in user's data
// @access  Private (because we use the 'auth' middleware)
app.get('/api/auth/user', auth, async (req, res) => {
  try {
    // The 'auth' middleware added the user's id to req.user
    // We find the user but exclude sending their password back
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ... rest of your server.js

const port = process.env.PORT || 5000;

const mongoURI = 'mongodb+srv://basicwork7:Juggernaut1234@cluster0.7vgem46.mongodb.net/MindBridge?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas connected Successfully'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});