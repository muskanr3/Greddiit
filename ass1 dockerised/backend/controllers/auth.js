const Registration = require('../models/registration.model');
// const Subgreddiit = require('../models/subgreddiit.model')
// const Followers = require('../models/followers.model')
// const Following = require('../models/following.models')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
    createJWT,
} = require("../utils/auth");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res, next) => {
    let { firstname, lastname, username, email, age, phonenumber, password } = req.body;

    let errors = [];
    if (!firstname) {
        errors.push({ firstname: "required" });
    }
    if (!lastname) {
        errors.push({ lastname: "required" });
    }
    if (!username) {
        errors.push({ username: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }
    if (!age) {
        errors.push({ age: "required" });
    }
    if (!phonenumber) {
        errors.push({ phonenumber: "required" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    Registration.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            } else {
                const user = new Registration({
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    email: email,
                    age: age,
                    phonenumber: phonenumber,
                    password: password,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(response => {
                                res.status(200).json({
                                    success: true,
                                    result: response
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{ error: err }]
                                }); user
                            });
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}

exports.signin = (req, res) => {
    console.log("in here")
    let { username, password } = req.body;

    // console.log(req.body)
    // console.log(username)
    // console.log(password)

    let errors = [];
    if (!username) {
        // console.log("gerer")
        errors.push({ username: "required" });
    }

    if (!password) {
        errors.push({ password: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }


    Registration.findOne({ username: username }).then(user => {
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }],
            });
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {

                    return res.status(400).json({
                        errors: [{
                            password:
                                "incorrect"
                        }]
                    });
                }


                let access_token = createJWT(
                    user.email,
                    user._id,
                    3600
                );
                jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
                    decoded) => {

                    if (err) {

                        res.status(500).json({ errors: err });

                    }

                    if (decoded) {
                        console.log(access_token)

                        return res.status(200).json({
                            success: true,
                            token: access_token,
                            message: user
                        });
                    }
                });
            }).catch(err => {
                res.status(500).json({ error: err });
                // console.log("issue")
            });
        }
    }).catch(err => {
        res.status(500).json({ erros: err });
    });
}

