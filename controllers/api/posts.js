const Post = require('../../models/post');
const Gig = require('../../models/gig');


module.exports = {
    createPost,
    createGig,
  };
  
  async function createPost(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).json(post);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  
  async function createGig(req, res) {
    try {
      const gig = await Gig.create(req.body);
      res.status(201).json(gig);
    } catch (err) {
      res.status(400).json(err);
    }
  }