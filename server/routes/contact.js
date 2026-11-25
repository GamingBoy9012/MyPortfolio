const express = require('express');
const contactController = require('../controllers/contact');
const auth = require('../helpers/auth');

const router = express.Router();

// Contact form submissions are public. Only an Admin can manage saved messages.
router.post('/', contactController.addContact);
router.get('/', auth.requireSignin, auth.isAdmin, contactController.getAllContacts);
router.get('/:id', auth.requireSignin, auth.isAdmin, contactController.getContactById);
router.put('/:id', auth.requireSignin, auth.isAdmin, contactController.updateContact);
router.delete('/:id', auth.requireSignin, auth.isAdmin, contactController.deleteContact);
router.delete('/', auth.requireSignin, auth.isAdmin, contactController.deleteAllContacts);

module.exports = router;
