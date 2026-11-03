const express = require('express');

const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/project');
const educationRoutes = require('./routes/education');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

// API Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', educationRoutes);
app.use('/api/users', userRoutes);

app.use(authRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to My Portfolio application.'
    });
});

// Error handling
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: err.name + ': ' + err.message
        });
    }

    if (err) {
        console.log(err);

        return res.status(400).json({
            error: err.name + ': ' + err.message
        });
    }

    next();
});

module.exports = app;