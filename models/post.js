const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  media: {
    type: [String]
  },
  gig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig' // reference to the gig/event associated with the post, if any.
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);