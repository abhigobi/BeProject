const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

router.get('/contacts', emailController.getContacts);
router.post('/contacts', emailController.createContact);
router.post('/send-email', emailController.sendEmail);

module.exports = router;
