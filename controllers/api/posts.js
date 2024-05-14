const Post = require('../../models/post');
const Gig = require('../../models/gig');

module.exports = {
    createPost,
    createEvent,
    getPosts,
    getEventPosts,
};

async function createPost(req, res) {
    console.log("Received request to create post:", req.body);
    console.log("Files received:", req.files);

    try {
        const mediaUrls = req.files.map(file => file.location);  // check if files are received
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id,
            media: mediaUrls
        });
        await post.populate({ path: 'user', select: '_id name' });
        res.status(201).json(post);
    } catch (err) {
        console.error('Error in createPost:', err);
        res.status(400).json(err);
    }
}

async function createEvent(req, res) {
    try {
        const { title, description, venue, date, price, supportingActs, spotifyLink, ticketLink } = req.body;
        const gig = new Gig({
            title,
            description,
            venue,
            date,
            price,
            supportingActs,
            spotifyLink,
            ticketLink,
            user: req.user._id
        });
        const savedGig = await gig.save();
        await savedGig.populate({ path: 'user', select: '_id name' });
        res.status(201).json(savedGig);
    } catch (error) {
        console.error("Error saving event:", error);
        res.status(400).json({ error: "Failed to save event", details: error.message });
    }
}


async function getPosts(req, res) {
    try {
        const posts = await Post.find().populate('user', 'name');
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

async function getEventPosts(req, res) {
    try {
        const eventPosts = await Gig.find().populate('user', 'name');
        res.json(eventPosts);
    } catch (error) {
        console.error('Error fetching event posts:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

