const express = require('express');
const userCtrl = require('../controllers/user');
const auth = require('../helpers/auth');

const router = express.Router();

router.get('/', auth.requireSignin, auth.isAdmin, userCtrl.list);
router.post('/', userCtrl.create);
router.get('/:userId', auth.requireSignin, auth.hasAuthorization, userCtrl.read);
router.put('/:userId', auth.requireSignin, auth.hasAuthorization, userCtrl.update);
router.delete('/:userId', auth.requireSignin, auth.hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userByID);

module.exports = router;
