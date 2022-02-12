const express = require('express');
const { renderContactList, redirectContact } = require('../controllers/contact');

const router = express.Router();

router.get('/contacts', renderContactList);

router.get('/about-us', redirectContact);

module.exports = router;
