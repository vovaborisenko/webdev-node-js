const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (name) => path.resolve(__dirname, 'ejs', `${name}.ejs`);

app.listen(PORT, (err) => {
  if (err) return console.log('Error: ', err);

  return console.log(`Server listening: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  const title = 'Home'
  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { link: 'http://youtube.com/YauhenKavalchuk', label: 'YouTube' },
    { link: 'http://github.com/YauhenKavalchuk', label: 'Twitter' },
    { link: 'http://twitter.com/YauhenKavalchuk', label: 'GitHub' },
  ];

  res.render(createPath('contacts'), { contacts, title });
});

app.get('/about-us', (req, res) => {
  res.redirect(301, '/contacts');
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';

  res.render(createPath('post'), { title });
});

app.get('/posts', (req, res) => {
  const title = 'Post list';

  res.render(createPath('posts'), { title });
});

app.get('/add-post', (req, res) => {
  const title = 'New post';

  res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
  const title = 'Oops! Error';

  res
    .status(404)
    .render(createPath('error'), { title });
});
