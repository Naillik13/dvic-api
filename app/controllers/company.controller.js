const Company = require('../models/company.model');
const User = require('../models/user.model');
const UserService = require('../services/user.service');
const CompanyService = require('../services/company.service');
const mongoose = require('mongoose');

exports.create = (req, res) => {
    // Validate request
    if(!req.body.siret) {
        return res.status(400).send({
            message: "Company siret can not be empty."
        });
    } else if (!req.body.name) {
        return res.status(400).send({
            message: "Company name can not be empty."
        });
    } else if (!req.body.owner) {
        return res.status(400).send({
            message: "Owner of the company can not be empty."
        });
    } else if (!CompanyService.isValidSiret(req.body.siret)) {
        return res.status(400).send({
            message: "Company siret is not valid."
        });
    }

    User.findById(req.body.owner).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.body.owner
            });
        }

        // Create a Company
        const company = new Company({
            siret: req.body.siret,
            name: req.body.name,
            owner: mongoose.Types.ObjectId(user._id)
        });

        // Save Company in the database
        company.save().then(data => {
            UserService.updateUserCompany(user._id, company._id).then(user => {
                if (user) {
                    return res.status(201).send(data);
                } else {
                    return res.status(500).send({
                        message: "Some error occurred while updating the User's company."
                    });
                }
            }).catch(_ => {
                return res.status(500).send({
                    message: "Some error occurred while updating the User's company."
                });
            });
        }).catch(err => {
            if (err.code === 11000) {
                return res.status(400).send({
                    message: "This siret already exist"
                });
            }
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Company."
            });
        });

    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.body.owner
            });
        }
    });
};

exports.findAll = (req, res) => {
    Company.find().then(companies => {
        return res.send(companies);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving companies."
        });
    });
};

exports.findOne = (req, res) => {
    Company.findById(req.params.companyId).then(company => {
        if(!company) {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });
        }
        res.status(200).send(company);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });
        }
        return res.status(500).send({
            message: "Error retrieving company with id " + req.params.companyId
        });
    });
};

exports.delete = (req, res) => {
    Company.findByIdAndRemove(req.params.companyId)
        .then(company => {
            if(!company) {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.companyId
                });
            }
            res.send({message: "Company deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Company not found with id " + req.params.companyId
            });
        }
        return res.status(500).send({
            message: "Could not delete company with id " + req.params.companyId
        });
    });
};
