const express = require('express');
const Registration = require('../models/registration.model');
const auth = require("../middleware/auth");
const Posts = require('../models/post.model');
const router = express.Router();
const Subgreddiit = require('../models/mySubgreddiits.models');


router.post("/:id", async (req, res) => {
    try {
        console.log("in post req for posts")
        // here id is the subgreddiit id
        const { id } = req.params
        const { body, userId } = req.body
        const upvotes = 0;
        const downvotes = 0;
        // const csplit = comments.split(",");
        // const ctrimmed = csplit.map((bw) => bw.trim());

        // console.log(ctrimmed);
        const post = new Posts({
            postBody: body,
            // comments: ctrimmed,
            upvotes: upvotes,
            downvotes: downvotes,
            user: userId,
            subgreddiit: id
        })
        await post.save();
        res.status(200).send(post);

    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        // get the posts from the current subgreddiit
        // console.log("in profile validation")
        // res.send(req.user)
        // const user = await Registration.findById(req.user.id)
        // const sg = await Subgreddiit.find({ name: name })
        // console.log(sg[0]._id)
        const posts = await Posts.find({ subgreddiit: id })
        // console.log(posts)
        res.send(posts)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


router.put("/upvotes", async (req, res) => {
    try {
        // const { id } = req.params;
        const { postId } = req.body
        console.log(req.body)
        const post = await Posts.findById(postId)
        post.upvotes = post.upvotes + 1
        console.log(post)
        // console.log("upvotes c= ", upvoteCount)

        // if (!user.requested.inccludes(joinee)) {
        // post.upvotes = upvoteCount
        post.save()
        res.send(post)
        // console.log("after", user)

    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


router.put("/downvotes", async (req, res) => {
    try {
        const { postId } = req.body
        const post = await Posts.findById(postId)
        console.log(post)

        post.downvotes = post.downvotes + 1

        post.save()
        res.send(post)

    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})

router.put("/comment", async (req, res) => {
    try {
        // console.log("in comment")
        const { postId, comment } = req.body
        const post = await Posts.findById(postId)
        // console.log(post)

        post.comments.push(comment)

        post.save()
        res.send(post)

    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


module.exports = router