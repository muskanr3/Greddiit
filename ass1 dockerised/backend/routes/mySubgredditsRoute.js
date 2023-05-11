const express = require('express');
const Registration = require('../models/registration.model');
const auth = require("../middleware/auth");
const Subgreddiit = require('../models/mySubgreddiits.models');
const router = express.Router();


router.post("/:id", async (req, res) => {
    try {
        console.log("in post req")

        const { id } = req.params
        const { name, desc, bannedWords, tags } = req.body
        const memberCount = 1;
        const postCount = 0;
        const followers = []
        const creator = id
        followers.push(id)
        // const split = tags.split(",")
        // const trimmed = split.trim()
        const bsplit = bannedWords.split(",");
        const btrimmed = bsplit.map((bw) => bw.trim());
        const split = tags.split(",");
        const trimmed = split.map((tag) => tag.trim());
        console.log(trimmed);
        console.log(btrimmed);

        // console.log(trimmed)
        // console.log("followers list = ", followers)
        // console.log("banned list = ", bannedWords.split(','))

        // initially each subgreddiit has 1 member and 0 posts
        const subgreddiit = new Subgreddiit({
            name: name,
            desc: desc,
            bannedWords: btrimmed,
            tags: trimmed,
            memberCount: memberCount,
            postCount: postCount,
            followers: followers,
            creator: creator
        })
        await subgreddiit.save();
        res.status(200).send(subgreddiit);

    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        // console.log("in profile validation")
        // res.send(req.user)
        const { id } = req.params
        console.log("id =", id)
        const query = { creator: id }
        const user = await Subgreddiit.find(query)
        console.log(user)
        res.send(user)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


router.delete("/:id", async (req, res) => {
    try {
        console.log("in delete")
        // res.send(req.user)
        const { id } = req.params
        // console.log("name = ", name)
        // const query = { name: name }
        const user = await Subgreddiit.findByIdAndDelete(id)
        // console.log(user)
        res.send(user)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


module.exports = router