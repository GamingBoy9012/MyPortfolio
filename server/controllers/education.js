
const Education = require('../models/education');

// Get all qualifications
exports.getAllEducations = async (req, res) => {
    try {
        const educations = await Education.find();
        res.json(educations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get qualification by ID
exports.getEducationById = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);

        if (!education) {
            return res.status(404).json({ message: 'Qualification not found' });
        }

        res.json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new qualification
exports.addEducation = async (req, res) => {
    try {
        const education = new Education(req.body);
        await education.save();
        res.status(201).json(education);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update qualification
exports.updateEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!education) {
            return res.status(404).json({ message: 'Qualification not found' });
        }

        res.json(education);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete qualification by ID
exports.deleteEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);

        if (!education) {
            return res.status(404).json({ message: 'Qualification not found' });
        }

        res.json({ message: 'Qualification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete all qualifications
exports.deleteAllEducations = async (req, res) => {
    try {
        await Education.deleteMany();
        res.json({ message: 'All qualifications deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
