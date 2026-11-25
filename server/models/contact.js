const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    contactNumber: String,
    email: String,
    message: String
});

module.exports = mongoose.model('Contact', contactSchema);
