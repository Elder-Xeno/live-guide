const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number
  },
  ticketLink: {
    type: String
  },
  spotifyLink: {
    type: String
  },
  supportingActs: {
    type: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Gig', gigSchema);