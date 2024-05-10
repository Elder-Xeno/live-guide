const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.get('/', postsCtrl.getPosts);

router.post('/', ensureLoggedIn, postsCtrl.createPost);


module.exports = router;