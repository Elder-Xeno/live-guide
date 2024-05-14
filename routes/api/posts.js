const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const upload = require('../../src/utilities/multer-upload');

router.get('/', postsCtrl.getPosts);
router.get('/events', postsCtrl.getEventPosts);

router.post('/', ensureLoggedIn, upload.array('media', 10), (req, res, next) => {
    console.log('Middleware log:', req.files); // check if files are received by multer
    next();
}, postsCtrl.createPost);

router.post('/events', ensureLoggedIn, postsCtrl.createEvent);

module.exports = router;
