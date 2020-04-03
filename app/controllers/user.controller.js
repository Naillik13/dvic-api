const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty."
        });
    } else if (!req.body.password) {
        return res.status(400).send({
            message: "User password can not be empty."
        });
    } else if (!req.body.passwordConfirmation) {
        return res.status(400).send({
            message: "Password confirmation can not be empty."
        });
    } else if (req.body.password !== req.body.passwordConfirmation) {
        return res.status(400).send({
            message: "Password confirmation can not be different from password."
        });
    }
    bcrypt.hash(req.body.password, 10).then((passwordHash) => {
        // Create a User
        const user = new User({
            email: req.body.email,
            password: passwordHash,
            admin: req.body.admin ? req.body.admin : false
        });

        // Save User in the database
        user.save().then(data => {
            res.status(201).send(data);
        }).catch(err => {
            if (err.code === 11000) {
                res.status(400).send({
                    message: "This email is already taken"
                });
            }
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all places from the database.
exports.findAll = (req, res) => {
    User.find().then(places => {
        res.send(places);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving places."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.status(200).send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
