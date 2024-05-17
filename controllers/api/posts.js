const Post = require("../../models/post");
const Gig = require("../../models/gig");

module.exports = {
  createPost,
  createEvent,
  getPosts,
  getPostsForUser,
  getEventPosts,
  getEventPostsForUser,
  deletePost,
  updatePost,
};

async function createPost(req, res) {
  console.log("Received request to create post:", req.body);
  console.log("Files received:", req.files);

  try {
    if (!req.files) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const mediaUrls = req.files.map((file) => file.location); // get the URLs of the uploaded files
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
      userName: req.user.name,
      media: mediaUrls,
    });
    await post.populate({ path: "user", select: "_id name" });
    res.status(201).json(post);
  } catch (err) {
    console.error("Error in createPost:", err);
    res.status(400).json(err);
  }
}

async function createEvent(req, res) {
  try {
    const {
      title,
      description,
      venue,
      date,
      price,
      supportingActs,
      spotifyLink,
      ticketLink,
    } = req.body;
    const gig = new Gig({
      title,
      description,
      venue,
      date,
      price,
      supportingActs,
      spotifyLink,
      ticketLink,
      user: req.user._id,
    });
    const savedGig = await gig.save();
    await savedGig.populate({ path: "user", select: "_id name" });
    res.status(201).json(savedGig);
  } catch (error) {
    console.error("Error saving event:", error);
    res
      .status(400)
      .json({ error: "Failed to save event", details: error.message });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await Post.find().populate("user", "name");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getPostsForUser(req, res) {
  try {
    const posts = await Post.find({ user: req.params.userId }).populate(
      "user",
      "name"
    );
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getEventPosts(req, res) {
  try {
    const eventPosts = await Gig.find().populate("user", "name");
    res.json(eventPosts);
  } catch (error) {
    console.error("Error fetching event posts:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getEventPostsForUser(req, res) {
  try {
    const eventPosts = await Gig.find({ user: req.params.userId }).populate(
      "user",
      "name"
    );
    res.json(eventPosts);
  } catch (error) {
    console.error("Error fetching event posts:", error);
    res.status(500).json({ error: "Server error" });
  }
}


async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized to delete this post" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ error: "Unauthorized to update this post" });
    }

    // Update content and existing media
    post.content = req.body.content;
    if (req.body.existingMedia) {
      post.media = JSON.parse(req.body.existingMedia);
    }

    // Add new media
    if (req.files) {
      const mediaUrls = req.files.map((file) => file.location);
      post.media = post.media.concat(mediaUrls);
    }

    await post.save();
    await post.populate({ path: "user", select: "_id name" });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Server error" });
  }
}