const express = require('express');
const userCtrl = require('../controllers/user');
const authHelper = require('../helpers/auth');

const router = express.Router();

router.param('userId', userCtrl.userByID);

router.route('/')
    .get(userCtrl.list)
    .post(userCtrl.create)
    .delete(userCtrl.removeAll);

router.route('/:userId')
    .get(authHelper.requireSignin, userCtrl.read)
    .put(
        authHelper.requireSignin,
        authHelper.hasAuthorization,
        userCtrl.update
    )
    .delete(
        authHelper.requireSignin,
        authHelper.hasAuthorization,
        userCtrl.remove
    );

module.exports = router;