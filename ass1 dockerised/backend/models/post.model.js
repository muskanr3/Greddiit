const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const Schema = mongoose.Schema

const postSchema = new Schema({

    postBody: {
        type: String,
        required: true,
    },
    comments: {
        type: [String],
        // required: true,
    },
    upvotes: {
        type: Number,
        required: true,
    },
    downvotes: {
        type: Number,
        required: true,
    },
    user: {
        type: ObjectId,
        required: true,
    },
    subgreddiit: {
        type: [ObjectId],
        required: true,
        ref: "subgreddiit"
    },
   
},
    {
        timestamps: true,   // automatically created fields for when created or modified
        collection: 'posts'
    })


const Posts = mongoose.model("Posts", postSchema)

module.exports = Posts

