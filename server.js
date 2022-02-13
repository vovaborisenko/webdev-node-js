const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();
const methodOverride = require('method-override');
const postRouter = require('./routes/post-routes');
const contactRouter = require('./routes/contact-routes');
const apiPostRouter = require('./routes/api-post-routes');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
const db = process.env.MONGODB_URL;
const infoLog = (...args) => console.log(chalk.magenta(...args));
const errorLog = (...args) => console.log(chalk.redBright(...args));

mongoose
  .connect(db)
  .then(() => infoLog('DB connection established'))
  .catch((error) => errorLog('Error:', error));

app.listen(PORT, (err) => {
  if (err) return errorLog('Error: ', err);

  return infoLog(`Server listening: http://localhost:${PORT}`);
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
app.use('/api', apiPostRouter);

app.use((req, res) => {
  const title = 'Oops! Error';

  res
    .status(404)
    .render(createPath('error'), { title });
});
