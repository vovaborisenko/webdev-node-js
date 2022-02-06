const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const createPath = (name) => path.resolve(__dirname, 'views', `${name}.html`);

const server = http.createServer((req, res) => {
  console.log(`Server request ${req.method} ${req.url}`);

  res.setHeader('Content-Type', 'text/html');

  let basePath = '';

  switch (req.url) {
    case '/':
    case '/home':
    case '/index.html':
      basePath = 'index';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/contacts');
      break;
    case '/contacts':
      basePath = 'contacts';
      res.statusCode = 200;
      break;
    default:
      basePath = 'error';
      res.statusCode = 404;
  }

  fs.readFile(createPath(basePath), (err, data) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.write(data);
    }

    res.end();
  });
});

server.listen(PORT, (err) => {
  if (err) return console.log('Error: ', err);

  return console.log(`Server listening: http://localhost:${PORT}`);
});
