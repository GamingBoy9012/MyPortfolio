
const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

// GET all contacts
router.get('/', contactController.getAllContacts);

// GET contact by ID
router.get('/:id', contactController.getContactById);

// POST new contact
router.post('/', contactController.addContact);

// PUT update contact
router.put('/:id', contactController.updateContact);

// DELETE contact by ID
router.delete('/:id', contactController.deleteContact);

// DELETE all contacts
router.delete('/', contactController.deleteAllContacts);

module.exports = router;
