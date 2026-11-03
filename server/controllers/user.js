const User = require('../models/user');

const safeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    created: user.created,
    updated: user.updated
});

exports.list = async (req, res, next) => {
    try {
        const users = await User.find().select('-hashed_password -salt');
        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.json(safeUser(user));
    } catch (err) {
        next(err);
    }
};

exports.userByID = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        req.profile = user;
        next();
    } catch (err) {
        next(err);
    }
};

exports.read = (req, res) => {
    res.json(safeUser(req.profile));
};

exports.update = async (req, res, next) => {
    try {
        const user = req.profile;

        if (req.body.name !== undefined) {
            user.name = req.body.name;
        }

        if (req.body.email !== undefined) {
            user.email = req.body.email;
        }

        if (req.body.password !== undefined) {
            user.password = req.body.password;
        }

        user.updated = Date.now();

        await user.save();

        res.json(safeUser(user));
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const user = req.profile;

        await user.deleteOne();

        res.json(safeUser(user));
    } catch (err) {
        next(err);
    }
};

exports.removeAll = async (req, res, next) => {
    try {
        const result = await User.deleteMany({});
        res.json(result);
    } catch (err) {
        next(err);
    }
};