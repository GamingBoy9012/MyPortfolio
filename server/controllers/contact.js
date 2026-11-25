const Contact = require('../models/contact');

exports.getAllContacts = async (req, res, next) => {
    try {
        res.json(await Contact.find().sort({ _id: -1 }));
    } catch (error) {
        next(error);
    }
};

exports.getContactById = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found.' });
        res.json(contact);
    } catch (error) {
        next(error);
    }
};

// Visitors can submit a contact message without creating an account.
exports.addContact = async (req, res, next) => {
    try {
        const contact = new Contact({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            message: req.body.message
        });

        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
};

exports.updateContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );

        if (!contact) return res.status(404).json({ message: 'Contact not found.' });
        res.json(contact);
    } catch (error) {
        next(error);
    }
};

exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found.' });
        res.json({ message: 'Contact deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

exports.deleteAllContacts = async (req, res, next) => {
    try {
        await Contact.deleteMany({});
        res.json({ message: 'All contacts deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
