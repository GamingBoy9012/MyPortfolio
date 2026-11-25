const { expressjwt } = require('express-jwt');
const config = require('../../config/config');

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    requestProperty: 'auth'
});

const hasAuthorization = (req, res, next) => {
    if (!req.auth || !req.profile ||
        String(req.profile._id) !== String(req.auth._id)) {
        return res.status(403).json({ error: 'User is not authorized.' });
    }

    next();
};

const isAdmin = (req, res, next) => {
    if (!req.auth || req.auth.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required.' });
    }

    next();
};

module.exports = { requireSignin, hasAuthorization, isAdmin };
