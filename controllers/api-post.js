const Post = require('../models/post');
const { apiErrorHandler } = require('../helpers/error-handler');

const getPost = (req, res) => {
  Post
    .findById(req.params.id)
    .then((post) => res.send(post))
    .catch((error) => apiErrorHandler(res, error));
};

const postPost = (req, res) => {
  const {
    title, author, content, excerpt,
  } = req.body;
  const post = new Post({
    title, author, content, excerpt,
  });

  post
    .save()
    .then((data) => res.send(data))
    .catch((error) => apiErrorHandler(res, error));
};

const putPost = (req, res) => {
  const {
    title, author, content, excerpt,
  } = req.body;
  const { id } = req.params;

  Post
    .findByIdAndUpdate(id, {
      title, author, content, excerpt,
    }, { new: true })
    .then((post) => res.send(post))
    .catch((error) => apiErrorHandler(res, error));
};

const deletePost = (req, res) => {
  const { id } = req.params;

  Post
    .findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => apiErrorHandler(res, error));
};

const getPosts = (req, res) => {
  Post
    .find()
    .sort({ createdAt: -1 })
    .then((list) => res.send(list))
    .catch((error) => apiErrorHandler(res, error));
};

module.exports = {
  getPost,
  postPost,
  putPost,
  deletePost,
  getPosts,
};
