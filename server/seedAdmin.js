const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const User = require('./models/user');
const config = require('../config/config');

const ADMIN_NAME = 'Portfolio Admin';
const ADMIN_EMAIL = 'admin@portfolio.com';
const ADMIN_PASSWORD = 'Admin123!';

async function createAdmin() {
    if (!config.mongoUri) throw new Error('MONGO_URI is missing in .env');

    await mongoose.connect(config.mongoUri);

    let admin = await User.findOne({ email: ADMIN_EMAIL });

    if (admin) {
        admin.role = 'admin';
        await admin.save();
        console.log('Existing account updated to Admin.');
    } else {
        admin = new User({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin account created.');
    }

    console.log(`Admin email: ${ADMIN_EMAIL}`);
    console.log(`Admin password: ${ADMIN_PASSWORD}`);
    await mongoose.disconnect();
}

createAdmin().catch(async (error) => {
    console.error('Could not create Admin:', error.message);
    await mongoose.disconnect();
    process.exit(1);
});
