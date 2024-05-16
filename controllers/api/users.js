const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Post = require('../../models/post');
const Gig = require('../../models/gig');

module.exports = {
  create,
  login,
  checkToken,
  searchUsers,
  getUserProfile,
};

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

async function searchUsers(req, res) {
  try {
    const query = req.params.query;
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        // { email: { $regex: query, $options: 'i' } }
      ]
    }).select('name email');
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.params.userId).select('name email');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const posts = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });
    const events = await Gig.find({ user: req.params.userId }).sort({ createdAt: -1 });

    res.json({ user, posts, events });
  } catch (err) {
    res.status(500).json(err);
  }
}


/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}