const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/user.model.js');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');

const privateKey = fs.readFileSync('././private.pem', 'utf8');

exports.isAuthenticated = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid token"
                });
            }

            const query = {email: user.email};
            User.findOne(query).then(user => {
                if (!user) {
                    res.status(401).json({
                        message: "Invalid token"
                    });
                    return
                }
                return next();
            }).catch(_ => {
                res.status(500).json({
                    message: "Some error occurred"
                });
            });
        });
    } else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};

exports.isAdmin = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid token"
                });
            }

            UserService.isAdminWithEmail(user.email).then(isAuthorized => {
                if (isAuthorized) {
                    return next();
                } else {
                    res.status(401).json({
                        message: "Unauthorized"
                    });
                }
            }).catch(_ => {
                res.status(500).send({
                    message: "Some error occurred"
                });
            })
        });
    } else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};

exports.isAuthorizedToDeleteUser = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid token"
                });
            }

            UserService.isAdminOrSameUser(user.email, req.params.userId).then(isAuthorized => {
                if (isAuthorized) {
                    return next();
                } else {
                    res.status(401).json({
                        message: "Unauthorized"
                    });
                }
            }).catch(_ => {
                res.status(500).send({
                    message: "Some error occurred"
                });
            })
        });
    } else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};

exports.signIn = (req, res) => {
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty."
        });
    } else if (!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty."
        });
    }

    const query = {email: req.body.email};
    User.findOne(query).then(user => {
        bcrypt.compare(req.body.password, user.password).then((isValidCredentials) => {
            if (!isValidCredentials || !user) {
                res.status(401).send({
                    message: "Invalid credentials"
                });
            }

            let token = jwt.sign({"email": user.email}, privateKey, {algorithm: 'HS256'});
            res.send(token);
        }).catch((error) =>  {
            console.log(error);
            res.status(500).send({
                message: "Some error occurred while trying to authenticate " + req.body.email
            });
        });
    }).catch(_ => {
        res.status(500).send({
            message: "Some error occurred while trying to authenticate " + req.body.email
        });
    });


};