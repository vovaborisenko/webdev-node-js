const express = require('express');
const {
  getPost, postPost, putPost, deletePost, getPosts,
} = require('../controllers/api-post');

const router = express.Router();

router.get('/posts', getPosts);
router.get('/post/:id', getPost);
router.post('/post/:id', postPost);
router.put('/post/:id', putPost);
router.delete('/post/:id', deletePost);

module.exports = router;
