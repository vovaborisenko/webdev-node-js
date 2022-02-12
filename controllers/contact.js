const Contact = require('../models/contact');
const createPath = require('../helpers/create-path');
const errorHandler = require('../helpers/error-handler');

const renderContactList = (req, res) => {
  const title = 'Contacts';

  Contact
    .find()
    .then((contacts) => res.render(createPath('contacts'), { contacts, title }))
    .catch((error) => errorHandler(res, error));
};

const redirectContact = (req, res) => {
  res.redirect(301, '/contacts');
};

module.exports = { renderContactList, redirectContact };
