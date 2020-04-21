const ProjectType = require('../models/projectType.model');
const mongoose = require('mongoose');

exports.create = (req, res) => {
    // Validate request
    if(!req.body.code) {
        return res.status(400).send({
            message: "Project type code can not be empty."
        });
    } else if (!req.body.label) {
        return res.status(400).send({
            message: "Project type label can not be empty."
        });
    } else if (!req.body.company) {
        return res.status(400).send({
            message: "Project type company can not be empty."
        });
    }

    const projectType = new ProjectType({
        code: req.body.code,
        label: req.body.label,
        company: mongoose.Types.ObjectId(req.body.company)
    });

    projectType.save().then(data => {
        return res.status(201).send(data);
    }).catch(err => {
        if (err.code === 11000) {
            return res.status(400).send({
                message: "This code already exist"
            });
        }
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the Project type."
        });
    });
};

exports.findAll = (req, res) => {
    ProjectType.find().then(projectTypes => {
        return res.send(projectTypes);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving companies."
        });
    });
};
