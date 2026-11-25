const express = require('express');
const projectController = require('../controllers/project');
const auth = require('../helpers/auth');

const router = express.Router();

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', auth.requireSignin, auth.isAdmin, projectController.addProject);
router.put('/:id', auth.requireSignin, auth.isAdmin, projectController.updateProject);
router.delete('/:id', auth.requireSignin, auth.isAdmin, projectController.deleteProject);
router.delete('/', auth.requireSignin, auth.isAdmin, projectController.deleteAllProjects);

module.exports = router;
