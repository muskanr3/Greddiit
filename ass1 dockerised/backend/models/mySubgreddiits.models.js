const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const Schema = mongoose.Schema

const mySubgreddiitSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    bannedWords: {
        type: [String],
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    memberCount: {
        type: Number,
        required: true,
    },
    postCount: {
        type: Number,
        required: true,
    },
    followers: {
        type: [ObjectId],
        required: true,
    },
    requested: {
        type: [ObjectId],
        required: true,
    },
    rejected: {
        type: [ObjectId],
        required: true,
    },
    creator: {
        type: ObjectId,
        required: true,
    },

    blocked: {
        type: [ObjectId],
        required: true,
    },
    unblocked: {
        type: [ObjectId],
        required: true,
    },

},
    {
        timestamps: true,   // automatically created fields for when created or modified
        collection: 'subgreddiit'
    })


const Subgreddiit = mongoose.model("Subgreddiit", mySubgreddiitSchema)

module.exports = Subgreddiit

