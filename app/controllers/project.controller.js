const Project = require('../models/project.model');
const mongoose = require('mongoose');

exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Project name can not be empty."
        });
    } else if (!req.body.company) {
        return res.status(400).send({
            message: "Project company can not be empty."
        });
    }

    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        type: mongoose.Types.ObjectId(req.body.type),
        company: mongoose.Types.ObjectId(req.body.company)
    });

    project.save().then(data => {
        return res.status(201).send(data);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the Project."
        });
    });
};

exports.findAll = (req, res) => {
    Project.find().then(project => {
        return res.send(project);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving projects."
        });
    });
};

exports.findByCompany = (req, res) => {
    const query = {company: mongoose.Types.ObjectId(req.params.companyId)};
    Project.find(query).then(projectTypes => {
        return res.send(projectTypes);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving projects."
        });
    });
};
