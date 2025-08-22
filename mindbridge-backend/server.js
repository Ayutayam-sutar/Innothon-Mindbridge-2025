const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const Mood = require('./models/Mood');
const Journal = require('./models/Journal');
const Post = require('./models/Post');
const Consultation = require('./models/Consultation'); 
const { GoogleGenerativeAI } = require('@google/generative-ai');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('./models/user');
const Message = require('./models/Message');
const http = require('http');
const { Server } = require("socket.io");
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

// @route   GET api/auth/user
// @desc    Get logged-in user's data AND their stats
app.get('/api/auth/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // --- START OF MODIFICATION ---
    
    // 1. Count the number of journal documents belonging to this user
    const journalCount = await Journal.countDocuments({ user: req.user.id });
    
    // 2. Count the number of post documents belonging to this user
    const postCount = await Post.countDocuments({ user: req.user.id });

    // 3. Send back a single object containing the user's data AND the new counts
    res.json({ ...user.toObject(), journalCount, postCount });
    
    // --- END OF MODIFICATION ---

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- START OF NEW MOOD ROUTES ---

// @route   POST api/moods
// @desc    Save a user's mood for the day (create or update)
// @access  Private
app.post('/api/moods', auth, async (req, res) => {
  const { mood, score } = req.body;
  const userId = req.user.id;

  // Get the start and end of today to check for an existing entry
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    let moodEntry = await Mood.findOne({
      user: userId,
      date: { $gte: today, $lt: tomorrow },
    });

    if (moodEntry) {
      // If an entry for today exists, update it
      moodEntry.mood = mood;
      moodEntry.score = score;
    } else {
      // If no entry exists for today, create a new one
      moodEntry = new Mood({
        user: userId,
        mood,
        score,
      });
    }

    await moodEntry.save();
    res.json(moodEntry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// server.js -> find and replace this entire route

// @route   GET api/moods
// @desc    Get all mood entries AND the check-in streak for the logged-in user
// @access  Private
app.get('/api/moods', auth, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });

    // --- START OF NEW STREAK CALCULATION LOGIC ---
    let streakCount = 0;
    if (moods.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const firstEntryDate = new Date(moods[0].date);
      firstEntryDate.setHours(0, 0, 0, 0);

      // Check if the most recent entry is today or yesterday
      if (firstEntryDate.getTime() === today.getTime() || firstEntryDate.getTime() === yesterday.getTime()) {
        streakCount = 1;
        for (let i = 0; i < moods.length - 1; i++) {
          const currentEntryDate = new Date(moods[i].date);
          const nextEntryDate = new Date(moods[i + 1].date);

          // Set hours to 0 to compare dates only
          currentEntryDate.setHours(0, 0, 0, 0);
          nextEntryDate.setHours(0, 0, 0, 0);

          const expectedPreviousDay = new Date(currentEntryDate);
          expectedPreviousDay.setDate(expectedPreviousDay.getDate() - 1);

          if (expectedPreviousDay.getTime() === nextEntryDate.getTime()) {
            streakCount++;
          } else {
            break; // Streak is broken
          }
        }
      }
    }
    // --- END OF NEW STREAK CALCULATION LOGIC ---

    // Send back an object containing both moods and the streak
    res.json({ moods, streakCount });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- END OF NEW MOOD ROUTES ---

// --- START OF NEW JOURNAL ROUTES ---

// @route   POST api/journal
// @desc    Create a new journal entry
// @access  Private
app.post('/api/journal', auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newJournalEntry = new Journal({
      user: req.user.id,
      title,
      content,
    });

    const journal = await newJournalEntry.save();
    res.json(journal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- REPLACE YOUR OLD JOURNAL ROUTES WITH THIS ---

// @route   POST api/journal
// @desc    Create a new journal entry
app.post('/api/journal', auth, async (req, res) => {
  try {
    // Now accepting mood and tags from the request
    const { title, content, mood, tags } = req.body;

    const newJournalEntry = new Journal({
      user: req.user.id,
      title,
      content,
      mood,
      tags,
    });

    const journal = await newJournalEntry.save();
    res.json(journal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/journal
// @desc    Get all journal entries for the logged-in user
app.get('/api/journal', auth, async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user.id }).sort({ date: -1 });
    res.json(journals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/journal/:id
// @desc    Update a journal entry
app.put('/api/journal/:id', auth, async (req, res) => {
    try {
        const { title, content, mood, tags } = req.body;

        let journal = await Journal.findById(req.params.id);
        if (!journal) return res.status(404).json({ msg: 'Entry not found' });

        // Ensure user owns the journal entry
        if (journal.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        journal = await Journal.findByIdAndUpdate(
            req.params.id,
            { $set: { title, content, mood, tags, date: new Date() } },
            { new: true }
        );

        res.json(journal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/journal/:id
// @desc    Delete a journal entry
app.delete('/api/journal/:id', auth, async (req, res) => {
    try {
        let journal = await Journal.findById(req.params.id);
        if (!journal) return res.status(404).json({ msg: 'Entry not found' });

        // Ensure user owns the journal entry
        if (journal.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Journal.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Entry removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- END OF NEW JOURNAL ROUTES ---

// --- NEW POST ROUTES WITH  ---

// @route   POST api/posts
// @desc    Create a community post
app.post('/api/posts', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.content, // Changed to match your frontend state
      category: req.body.category,
      isAnonymous: req.body.isAnonymous,
      // If anonymous, use 'Anonymous User', otherwise use their real username
      name: req.body.isAnonymous ? 'Anonymous User' : user.username,
      user: req.user.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// And REPLACE it with this:
// @route   GET api/posts
// @desc    Get all community posts (with like status for current user)
app.get('/api/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    // --- START OF UPGRADE LOGIC ---
    // Go through each post and add helpful info for the frontend
    const postsWithLikeStatus = posts.map(post => {
      const postObject = post.toObject();
      
      // Check if the current user's ID is in this post's 'likes' array
      const isLiked = post.likes.some(like => like.user.toString() === req.user.id);
      
      // Check if the current user is the author of this post
      const isMine = post.user.toString() === req.user.id;
      
      // Return a new object with the original post data plus our new properties
      return { ...postObject, isLiked, isMine };
    });
    // --- END OF UPGRADE LOGIC ---

    res.json(postsWithLikeStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
app.delete('/api/posts/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.deleteOne();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/like/:id
// @desc    Like or unlike a post
app.put('/api/posts/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked by this user
        if (post.likes.some((like) => like.user.toString() === req.user.id)) {
            // If yes, remove the like (unlike)
            post.likes = post.likes.filter(
                ({ user }) => user.toString() !== req.user.id
            );
        } else {
            // If no, add the like
            post.likes.unshift({ user: req.user.id });
        }

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// END OF NEW POST ROUTES

// In server.js

// ... after your app.put('/api/posts/like/:id', ...) route

// --- START OF NEW COMMENT ROUTES ---

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
app.post('/api/posts/comment/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.username,
      user: req.user.id,
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
app.delete('/api/posts/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Find the comment to be deleted
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );

        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check if the user deleting the comment is the one who made it
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
        );

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- END OF NEW COMMENT ROUTES ---

// --- START OF NEW AI ROUTE ---

// Initialize the Google AI SDK with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST api/ai/chat
// @desc    Send a message to the Gemini AI
// @access  Private
app.post('/api/ai/chat', auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ msg: 'Message is required' });
    }

    // Choose the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = await model.startChat({
      // Optional: You can provide history here if you want context
      history: [],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    res.json({ response: text });

  } catch (err) {
    console.error('AI Chat Error:', err.message);
    res.status(500).send('Server Error');
  }
});

// --- END OF NEW AI ROUTE ---

// ADD THIS ENTIRE BLOCK
// Create an HTTP server from the Express app
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // IMPORTANT: Make sure this is your frontend's URL
    methods: ["GET", "POST"]
  }
});

// ADD THIS ENTIRE BLOCK FOR CHAT LOGIC

// Array of random anonymous names for the chat
const anonymousUsernames = [
    'Supportive Friend', 'Caring Peer', 'Good Listener', 
    'Helpful Stranger', 'Kind Soul', 'Understanding Voice'
];

// This runs whenever a client connects to the chat
// This runs whenever a client connects to the chat
// This runs whenever a client connects to the chat
io.on('connection', async (socket) => { // <-- Made this async
  console.log(`A user connected via WebSocket: ${socket.id}`);

  // Update and broadcast user count
  io.emit('update user count', io.engine.clientsCount);

  // --- NEW: LOAD CHAT HISTORY ---
  try {
    // Find the last 50 messages, sort them by timestamp
    const messages = await Message.find().sort({ timestamp: 1 }).limit(50);
    // Send only to the newly connected client
    socket.emit('load history', messages);
  } catch (error) {
    console.error('Error loading chat history:', error);
  }

  // This runs when a message is received from a client
  socket.on('chat message', async (msg) => { // <-- Made this async
    const newMessage = new Message({
        content: msg.content,
        senderId: socket.id,
        user: anonymousUsernames[Math.floor(Math.random() * anonymousUsernames.length)]
    });

    try {
      // --- NEW: Save the message to the database ---
      const savedMessage = await newMessage.save();
      // Broadcast the SAVED message (which includes the DB _id and timestamp)
      io.emit('chat message', savedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // This runs when a client disconnects
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    io.emit('update user count', io.engine.clientsCount);
  });
});

// --- START OF NEW STRIPE ROUTE ---

// @route   POST /api/stripe/create-checkout-session
// @desc    Create a new stripe checkout session
// @access  Private
app.post('/api/stripe/create-checkout-session', auth, async (req, res) => {
  const { doctorName, consultationFee } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr', // Indian Rupees
            product_data: {
              name: `Consultation with ${doctorName}`,
            },
            unit_amount: consultationFee * 100, // Amount in paise
          },
          quantity: 1,
        },
      ],
      // The URLs Stripe will redirect to after payment
      success_url: `${process.env.CLIENT_URL}/app/consultation?payment=success`,
      cancel_url: `${process.env.CLIENT_URL}/app/consultation?payment=cancelled`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe Error:', err.message);
    res.status(500).send('Server Error');
  }
});

// --- END OF NEW STRIPE ROUTE ---

// --- START OF NEW CONSULTATION ROUTES ---

// @route   POST api/consultations
// @desc    Request a new consultation
// @access  Private
app.post('/api/consultations', auth, async (req, res) => {
  try {
    const { doctorName, doctorSpecialty, requestedDate, notes } = req.body;

    const newConsultation = new Consultation({
      user: req.user.id,
      doctorName,
      doctorSpecialty,
      requestedDate,
      notes,
    });

    const consultation = await newConsultation.save();
    res.json(consultation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/consultations
// @desc    Get all consultations for the logged-in user
app.get('/api/consultations', auth, async (req, res) => {
  try {
    const consultations = await Consultation.find({ user: req.user.id }).sort({ requestDate: -1 });
    res.json(consultations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- END OF NEW CONSULTATION ROUTES ---

// ... rest of your server.js

const port = process.env.PORT || 5000;

const mongoURI = 'mongodb+srv://basicwork7:Juggernaut1234@cluster0.7vgem46.mongodb.net/MindBridge?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas connected Successfully'))
  .catch(err => console.log(err));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});