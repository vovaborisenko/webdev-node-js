const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (name) => path.resolve(__dirname, 'ejs-views', `${name}.ejs`);

app.listen(PORT, (err) => {
  if (err) return console.log('Error: ', err);

  return console.log(`Server listening: http://localhost:${PORT}`);
});

app.use(express.static('styles'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':date[web] :method :url :status :res[content-length] - :response-time ms'));

app.get('/', (req, res) => {
  const title = 'Home';

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
  const post = {
    id: 1,
    date: '05.05.2021',
    author: 'Yauhen',
    title: 'Post Title',
    content: `<p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.
      </p><p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.
      </p>`,
  };

  res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) => {
  const list = [{
    id: 1,
    date: '05.05.2021',
    author: 'Yauhen',
    title: 'Post Title',
    excerpt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
  }];

  res.render(createPath('posts'), { title: list.title, list });
});

app.get('/add-post', (req, res) => {
  const title = 'New post';

  res.render(createPath('add-post'), { title });
});

app.post('/add-post', (req, res) => {
  const { title, author, content } = req.body;
  const post = {
    id: Date.now(),
    date: (new Date()).toLocaleDateString('ru'),
    title,
    author,
    content,
  };

  res.render(createPath('post'), { title, post });
});

app.use((req, res) => {
  const title = 'Oops! Error';

  res
    .status(404)
    .render(createPath('error'), { title });
});
