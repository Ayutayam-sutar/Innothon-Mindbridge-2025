// models/Journal.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // --- START OF CHANGES ---
  mood: {
    type: String,
    default: 'neutral', // Matches your form's default
  },
  tags: {
    type: [String], // Defines tags as an array of strings
    default: [],
  },
  // --- END OF CHANGES ---
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('journal', JournalSchema);