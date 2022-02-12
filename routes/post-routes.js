const express = require('express');
const {
  renderPost, createPost, updatePost, deletePost, renderAddPost, renderPostList, renderEditPost,
} = require('../controllers/post');

const router = express.Router();

router.get('/posts', renderPostList);
router.get('/posts/:id', renderPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

router.get('/add-post', renderAddPost);
router.post('/add-post', createPost);

router.get('/edit-post/:id', renderEditPost);

module.exports = router;
