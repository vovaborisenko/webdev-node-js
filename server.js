const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRouter = require('./routes/post-routes');
const contactRouter = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://vovaborisenko:Kolcevaya53@cluster0.ovkt9.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
  .connect(db)
  .then(() => console.log('DB connection established'))
  .catch((error) => console.log(error));

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

app.use(postRouter);
app.use(contactRouter);

app.use((req, res) => {
  const title = 'Oops! Error';

  res
    .status(404)
    .render(createPath('error'), { title });
});
