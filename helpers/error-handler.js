const createPath = require('./create-path');

const errorHandler = (res, error) => {
  console.log(error.message);
  res
    .status(404)
    .render(createPath('error'), { title: 'Error' });
};

const apiErrorHandler = (res, { message }) => {
  console.log(message);
  res
    .status(400)
    .send({ status: 'ERROR', message });
};

module.exports = { errorHandler, apiErrorHandler };
