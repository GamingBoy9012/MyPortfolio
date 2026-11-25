const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./server/express');

if (!config.mongoUri) {
    console.error('MONGO_URI is missing. Add it to the root .env file.');
    process.exit(1);
}

if (!config.jwtSecret) {
    console.error('JWT_SECRET is missing. Add it to the root .env file.');
    process.exit(1);
}

mongoose.connect(config.mongoUri)
    .then(() => {
        console.log('Connected to MongoDB.');
        app.listen(config.port, () => {
            console.log(`Server running at http://localhost:${config.port}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to MongoDB:', error.message);
        process.exit(1);
    });
