const express = require('express');
const authCtrl = require('../controllers/auth');

const router = express.Router();

router.post('/signin', authCtrl.signin);
router.get('/signout', authCtrl.signout);

module.exports = router;
