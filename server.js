const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '.env')
});

const config = require('./config/config');
const app = require('./server/express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri)
    .then(() => {
        console.log('Connected to the database!');

        app.listen(config.port, () => {
            console.log(`Server started on port ${config.port}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to database:', error.message);
    });