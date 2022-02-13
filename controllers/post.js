const Post = require('../models/post');
const createPath = require('../helpers/create-path');
const { errorHandler } = require('../helpers/error-handler');

const renderPost = (req, res) => {
  const title = 'Post';

  Post
    .findById(req.params.id)
    .then((post) => res.render(createPath('post'), { title, post }))
    .catch((error) => errorHandler(res, error));
};

const createPost = (req, res) => {
  const {
    title, author, content, excerpt,
  } = req.body;
  const post = new Post({
    title, author, content, excerpt,
  });

  post
    .save()
    .then(() => res.redirect('/posts'))
    .catch((error) => errorHandler(res, error));
};

const updatePost = (req, res) => {
  const {
    title, author, content, excerpt,
  } = req.body;
  const { id } = req.params;

  Post
    .findByIdAndUpdate(id, {
      title, author, content, excerpt,
    })
    .then(() => res.redirect(`/posts/${id}`))
    .catch((error) => errorHandler(res, error));
};

const deletePost = (req, res) => {
  const { id } = req.params;

  Post
    .findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => errorHandler(res, error));
};

const renderAddPost = (req, res) => {
  const title = 'New Post';

  res.render(createPath('add-post'), { title });
};

const renderPostList = (req, res) => {
  const title = 'Posts';

  Post
    .find()
    .sort({ createdAt: -1 })
    .then((list) => res.render(createPath('posts'), { title, list }))
    .catch((error) => errorHandler(res, error));
};

const renderEditPost = (req, res) => {
  const title = 'Edit Post';

  Post
    .findById(req.params.id)
    .then((post) => res.render(createPath('edit-post'), { title, post }))
    .catch((error) => errorHandler(res, error));
};

module.exports = {
  renderPost,
  createPost,
  updatePost,
  deletePost,
  renderAddPost,
  renderPostList,
  renderEditPost,
};
