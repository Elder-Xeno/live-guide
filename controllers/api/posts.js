const Post = require('../../models/post');
const Gig = require('../../models/gig');

module.exports = {
    createPost,
    createEvent,
    getPosts,
    getEventPosts,
};

async function createPost(req, res) {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function createEvent(req, res) {
    try {
        const event = await Gig.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getPosts(req, res) {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

async function getEventPosts(req, res) {
    try {
        const eventPosts = await Gig.find();
        res.json(eventPosts);
    } catch (error) {
        console.error('Error fetching event posts:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
