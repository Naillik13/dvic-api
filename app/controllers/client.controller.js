const Client = require('../models/client.model');
const Company = require('../models/company.model');
const mongoose = require('mongoose');
const CompanyService = require("../services/company.service");

exports.create = (req, res) => {
    // Validate request
    if(!req.body.siret) {
        return res.status(400).send({
            message: "Client siret can not be empty."
        });
    } else if (!req.body.name) {
        return res.status(400).send({
            message: "Client name can not be empty."
        });
    } else if (!req.body.contact) {
        return res.status(400).send({
            message: "Client contact can not be empty."
        });
    } else if (!CompanyService.isValidSiret(req.body.siret)) {
        return res.status(400).send({
            message: "Company siret is not valid."
        });
    }

    Company.findById(req.body.company).then(company => {
        if(!company) {
            return res.status(404).send({
                message: "Company not found with id " + req.body.company
            });
        }

        const client = new Client({
            siret: req.body.siret,
            name: req.body.name,
            contact: req.body.contact,
            company: mongoose.Types.ObjectId(company._id)
        });

        client.save().then(data => {
            return res.status(201).send(data);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Company."
            });
        });

    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Company not found with id " + req.body.owner
            });
        }
    });
};

exports.findAll = (req, res) => {
    Client.find().then(clients => {
        return res.send(clients);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving companies."
        });
    });
};
