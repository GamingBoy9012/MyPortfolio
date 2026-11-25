const Project = require('../models/project');

exports.getAllProjects = async (req, res, next) => {
    try {
        res.json(await Project.find().sort({ _id: -1 }));
    } catch (error) {
        next(error);
    }
};

exports.getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found.' });
        res.json(project);
    } catch (error) {
        next(error);
    }
};

exports.addProject = async (req, res, next) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

exports.updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!project) return res.status(404).json({ message: 'Project not found.' });
        res.json(project);
    } catch (error) {
        next(error);
    }
};

exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found.' });
        res.json({ message: 'Project deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

exports.deleteAllProjects = async (req, res, next) => {
    try {
        await Project.deleteMany({});
        res.json({ message: 'All projects deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
