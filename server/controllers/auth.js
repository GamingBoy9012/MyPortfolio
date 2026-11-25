const User = require('../models/user');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || !user.authenticate(req.body.password)) {
            return res.status(401).json({
                error: 'Incorrect email or password.'
            });
        }

        const token = jwt.sign(
            { _id: String(user._id), role: user.role },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.signout = (req, res) => {
    res.json({ message: 'Signed out successfully.' });
};
