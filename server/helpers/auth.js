
const { expressjwt } = require('express-jwt');
const config = require('../../config/config');

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    requestProperty: 'auth'
});

const hasAuthorization = (req, res, next) => {
    const authorized =
        req.profile && req.auth &&
        req.profile._id == req.auth._id;

    if (!authorized) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }

    next();
};

module.exports = {
    requireSignin,
    hasAuthorization
};
