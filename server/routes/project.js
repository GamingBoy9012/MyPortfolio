
const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project');

// GET all projects
router.get('/', projectController.getAllProjects);

// GET project by ID
router.get('/:id', projectController.getProjectById);

// POST new project
router.post('/', projectController.addProject);

// PUT update project
router.put('/:id', projectController.updateProject);

// DELETE project by ID
router.delete('/:id', projectController.deleteProject);

// DELETE all projects
router.delete('/', projectController.deleteAllProjects);

module.exports = router;
