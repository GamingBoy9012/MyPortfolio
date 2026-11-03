const express = require('express');
const router = express.Router();

const educationController = require('../controllers/education');

// GET all qualifications
router.get('/', educationController.getAllEducations);

// GET qualification by ID
router.get('/:id', educationController.getEducationById);

// POST new qualification
router.post('/', educationController.addEducation);

// PUT update qualification
router.put('/:id', educationController.updateEducation);

// DELETE qualification by ID
router.delete('/:id', educationController.deleteEducation);

// DELETE all qualifications
router.delete('/', educationController.deleteAllEducations);

module.exports = router;