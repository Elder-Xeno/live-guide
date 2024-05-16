const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/api/posts");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const upload = require("../../src/utilities/multer-upload");

router.get("/", postsCtrl.getPosts);
router.get("/events", postsCtrl.getEventPosts);

router.post(
    "/",
    ensureLoggedIn,
    upload.array("media", 10),
  (req, res, next) => {
    console.log("Middleware log - req.body:", req.body);
    console.log("Middleware log - req.form:", req.form); // check if files are received by multer
    console.log("Middleware log - req.files:", req.files); // check if files are received by multer
    console.log("Middleware log - req.files:", req.json); // check if files are received by multer
    next();
  },
  postsCtrl.createPost
);

router.post("/events", ensureLoggedIn, postsCtrl.createEvent);

module.exports = router;
