const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

const createPath = (name) => path.resolve(__dirname, 'views', `${name}.html`);

app.listen(PORT, (err) => {
  if (err) return console.log('Error: ', err);

  return console.log(`Server listening: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(createPath('index'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(createPath('contacts'));
});

app.get('/about-us', (req, res) => {
  res.redirect(301, '/contacts');
});

app.use((req, res) => {
  res.status(404).sendFile(createPath('error'));
});
