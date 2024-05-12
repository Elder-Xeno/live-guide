const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  location: {
    type: String,
    // required: true    //Uncomment this when we have map API integrated
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