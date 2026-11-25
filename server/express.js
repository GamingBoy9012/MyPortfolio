const express = require('express');

const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/project');
const educationRoutes = require('./routes/education');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', educationRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to My Portfolio application.' });
});

app.use((error, req, res, next) => {
    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Please sign in with an authorized account.' });
    }

    if (error.name === 'ValidationError' || error.name === 'MongoServerError') {
        return res.status(400).json({ error: error.message });
    }

    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid record ID.' });
    }

    console.error(error);
    res.status(500).json({ error: 'Something went wrong on the server.' });
});

module.exports = app;
