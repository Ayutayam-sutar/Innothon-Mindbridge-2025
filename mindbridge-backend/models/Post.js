// models/Post.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  name: { // The author's name at the time of posting
    type: String,
  },
  // --- START OF UPGRADES ---
  isAnonymous: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    default: 'support',
  },
  likes: [ // An array of user IDs who have liked the post
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  comments: [ // We'll build this feature later
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  // --- END OF UPGRADES ---
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', PostSchema);