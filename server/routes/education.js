const express = require('express');
const educationController = require('../controllers/education');
const auth = require('../helpers/auth');

const router = express.Router();

router.get('/', educationController.getAllEducations);
router.get('/:id', educationController.getEducationById);
router.post('/', auth.requireSignin, auth.isAdmin, educationController.addEducation);
router.put('/:id', auth.requireSignin, auth.isAdmin, educationController.updateEducation);
router.delete('/:id', auth.requireSignin, auth.isAdmin, educationController.deleteEducation);
router.delete('/', auth.requireSignin, auth.isAdmin, educationController.deleteAllEducations);

module.exports = router;
