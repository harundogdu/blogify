const express = require("express");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const registerSchema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email().min(3).max(255),
    password: Joi.string().required().min(6).max(255),
});

const loginSchema = Joi.object({
    email: Joi.string().required().email().min(3).max(255),
    password: Joi.string().required().min(6).max(255),
});

module.exports.registerUser = (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        ...req.body,
        password: hash,
    });

    user
        .save()
        .then((user) => {
            const token = jwt.sign(
                {
                    _id: user._id,
                },
                process.env.JWT_SECRET
            );
            res.header("Authorization", token).json({
                accessToken: token,
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: 400,
                message: err.message,
            });
        });
};

module.exports.loginUser = (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
        return;
    }

    User.findOne({
        email: req.body.email,
    }).then((user) => {
        if (!user) {
            res.status(400).json({
                status: 400,
                message: "Invalid email or password",
            });
        }

        const isValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isValid) {
            res.status(400).json({
                status: 400,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.header("Authorization", token).json({
            accessToken: token,
        });
    }).catch((err) => {
        res.status(400).json({
            status: 400,
            message: "Invalid email or password",
        });
    });
};

module.exports.logoutUser = (req, res) => {
    res.header("Authorization", "").json({
        accessToken: "",
    });
    return;
}
