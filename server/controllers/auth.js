const User = require('../models/user');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(401).json({
                error: 'User not found'
            });
        }

        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }

        const token = jwt.sign(
            { _id: user._id },
            config.jwtSecret
        );

        res.cookie('t', token, {
            expires: new Date(Date.now() + 9999)
        });

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.signout = (req, res) => {
    res.clearCookie('t');

    return res.json({
        message: 'signed out'
    });
};