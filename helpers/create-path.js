const path = require('path');

const createPath = (name) => path.resolve(__dirname, '../views', `${name}.ejs`);

module.exports = createPath;
