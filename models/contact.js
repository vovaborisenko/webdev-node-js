const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  title: { type: 'string', required: true },
  link: { type: 'string', required: true },
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
