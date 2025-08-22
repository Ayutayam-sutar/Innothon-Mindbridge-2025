// models/Mood.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user', // This links the mood entry to a specific user
    required: true,
  },
  mood: {
    type: String, // 'happy', 'neutral', 'sad'
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('mood', MoodSchema);