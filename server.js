const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const Post = require('./models/post');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://vovaborisenko:Kolcevaya53@cluster0.ovkt9.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
  .connect(db)
  .then(() => console.log('DB connection established'))
  .catch((error) => console.log(error));

const createPath = (name) => path.resolve(__dirname, 'ejs-views', `${name}.ejs`);

app.listen(PORT, (err) => {
  if (err) return console.log('Error: ', err);

  return console.log(`Server listening: http://localhost:${PORT}`);
});

app.use(express.static('styles'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan(':date[web] :method :url :status :res[content-length] - :response-time ms'));

app.get('/', (req, res) => {
  const title = 'Home';

  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';

  Contact
    .find()
    .then((contacts) => res.render(createPath('contacts'), { contacts, title }))
    .catch((error) => {
      console.log(error.message);
      res
        .status(400)
        .send(error.message);
    });
});

app.get('/about-us', (req, res) => {
  res.redirect(301, '/contacts');
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';

  Post
    .findById(req.params.id)
    .then((post) => res.render(createPath('post'), { title, post }))
    .catch((error) => {
      console.log(error.message);
      res
        .status(404)
        .render(createPath('error'), { title });
    });
});

app.put('/posts/:id', (req, res) => {
  const {
    title, author, content, excerpt,
  } = req.body;
  const { id } = req.params;

  Post
    .findByIdAndUpdate(id, {
      title, author, content, excerpt: excerpt || content.replace(/<.+?>/, '').slice(0, 200),
    })
    .then(() => res.redirect(`/posts/${id}`))
    .catch((error) => {
      console.log(error.message);
      res
        .status(400)
        .send(error.message);
    });
});

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;

  Post
    .findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error.message);
      res
        .status(400)
        .send(error.message);
    });
});

app.get('/edit-post/:id', (req, res) => {
  const title = 'Edit Post';

  Post
    .findById(req.params.id)
    .then((post) => res.render(createPath('edit-post'), { title, post }))
    .catch((error) => {
      console.log(error.message);
      res
        .status(400)
        .send(error.message);
    });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';

  Post
    .find()
    .sort({ createdAt: -1 })
    .then((list) => res.render(createPath('posts'), { title, list }))
    .catch((error) => {
      console.log(error.message);
      res
        .status(400)
        .send(error.message);
    });
});

app.get('/add-post', (req, res) => {
  const title = 'New Post';

  res.render(createPath('add-post'), { title });
});

app.post('/add-post', (req, res) => {
  const {
    title, author, content, excerpt,
  } = req.body;
  const post = new Post({
    title, author, content, excerpt: excerpt || content.replace(/<.+?>/, '').slice(0, 200),
  });

  post
    .save()
    .then(() => res.redirect('/posts'))
    .catch((error) => {
      console.log(error.message);
      res
        .status(400)
        .send(error.message);
    });
});

app.use((req, res) => {
  const title = 'Oops! Error';

  res
    .status(404)
    .render(createPath('error'), { title });
});
