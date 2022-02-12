const createPath = require('./create-path');

const errorHandler = (res, error) => {
  console.log(error.message);
  res
    .status(404)
    .render(createPath('error'), { title: 'Error' });
};

module.exports = errorHandler;
