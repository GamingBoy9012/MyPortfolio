const User = require('../models/user');

const safeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    created: user.created,
    updated: user.updated
});

// Admin: get all registered users.
exports.list = async (req, res, next) => {
    try {
        const users = await User.find().select('-hashed_password -salt');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// Public signup. A new account is always a regular user.
exports.create = async (req, res, next) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user'
        });

        await user.save();
        res.status(201).json(safeUser(user));
    } catch (error) {
        next(error);
    }
};

exports.userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        req.profile = user;
        next();
    } catch (error) {
        next(error);
    }
};

exports.read = (req, res) => {
    res.json(safeUser(req.profile));
};

exports.update = async (req, res, next) => {
    try {
        const user = req.profile;

        if (req.body.name !== undefined) user.name = req.body.name;
        if (req.body.email !== undefined) user.email = req.body.email;
        if (req.body.password !== undefined) user.password = req.body.password;

        user.updated = Date.now();
        await user.save();

        res.json(safeUser(user));
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const user = req.profile;
        await user.deleteOne();
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
