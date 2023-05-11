const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const Schema = mongoose.Schema

const RegSchema = new Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    followers: {
        type: [ObjectId],
        ref: "Registration",
    },
    following: {
        type: [ObjectId],
        ref: "Registration",
    },

},
    {
        timestamps: true,   // automatically created fields for when created or modified
        collection: 'registrations'
    })


RegSchema.methods.createToken = function () {
    // payload is whatever you want to encode
    const payload = {
        user: {
            id: this._id
        }
    }

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 360000000000 })
    return token;
}

RegSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

const Registration = mongoose.model("Registration", RegSchema)

module.exports = Registration

