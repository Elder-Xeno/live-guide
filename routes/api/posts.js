const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', postsCtrl.getPosts);
router.get('/events', postsCtrl.getEventPosts);

router.post('/', ensureLoggedIn, postsCtrl.createPost);
router.post('/events', ensureLoggedIn, postsCtrl.createEvent);

module.exports = router;
