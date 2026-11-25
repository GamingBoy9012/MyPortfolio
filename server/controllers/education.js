const Education = require('../models/education');

exports.getAllEducations = async (req, res, next) => {
    try {
        res.json(await Education.find().sort({ _id: -1 }));
    } catch (error) {
        next(error);
    }
};

exports.getEducationById = async (req, res, next) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) return res.status(404).json({ message: 'Qualification not found.' });
        res.json(education);
    } catch (error) {
        next(error);
    }
};

exports.addEducation = async (req, res, next) => {
    try {
        const education = new Education(req.body);
        await education.save();
        res.status(201).json(education);
    } catch (error) {
        next(error);
    }
};

exports.updateEducation = async (req, res, next) => {
    try {
        const education = await Education.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!education) return res.status(404).json({ message: 'Qualification not found.' });
        res.json(education);
    } catch (error) {
        next(error);
    }
};

exports.deleteEducation = async (req, res, next) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);
        if (!education) return res.status(404).json({ message: 'Qualification not found.' });
        res.json({ message: 'Qualification deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

exports.deleteAllEducations = async (req, res, next) => {
    try {
        await Education.deleteMany({});
        res.json({ message: 'All qualifications deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
