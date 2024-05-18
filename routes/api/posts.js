const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/api/posts");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const upload = require("../../src/utilities/multer-upload");




router.get("/", postsCtrl.getPosts); // get all posts
router.get("/user/:userId", postsCtrl.getPostsForUser); // get all posts with a user id


router.get("/events", postsCtrl.getEventPosts); // get all events
router.get("/events/:userId", postsCtrl.getEventPostsForUser); // get all events with a user id


router.post(
    "/",
    ensureLoggedIn,
    upload.array("media", 10),
  (req, res, next) => {
    next();
  },
  postsCtrl.createPost
);

router.post("/events", ensureLoggedIn, postsCtrl.createEvent);

router.delete("/:id", ensureLoggedIn, postsCtrl.deletePost);

router.put("/:id", ensureLoggedIn, upload.array("media", 10), postsCtrl.updatePost);

router.post("/:id/like", ensureLoggedIn, postsCtrl.likePost);
router.post("/:id/unlike", ensureLoggedIn, postsCtrl.unlikePost);

module.exports = router;
