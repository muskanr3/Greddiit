const express = require('express');
const Registration = require('../models/registration.model');
const auth = require("../middleware/auth");
const Subgreddiit = require('../models/mySubgreddiits.models');
const router = express.Router();


// router.post("/:id", async (req, res) => {
//     try {
//         console.log("in post req")
//         const { id } = req.params
//         const { name, desc, bannedWords, tags } = req.body
//         const memberCount = 1;
//         const postCount = 0;
//         const followers = []
//         const creator = id
//         followers.push(id)
//         // console.log("followers list = ", followers)
//         // console.log("banned list = ", bannedWords.split(','))

//         // initially each subgreddiit has 1 member and 0 posts
//         const subgreddiit = new Subgreddiit({
//             name: name,
//             desc: desc,
//             bannedWords: bannedWords.split(","),
//             tags: tags.split(","),
//             memberCount: memberCount,
//             postCount: postCount,
//             followers: followers,
//             creator: creator
//         })
//         await subgreddiit.save();
//         res.status(200).send(subgreddiit);

//     } catch (err) {
//         console.log("error: ", err)
//         res.status(500).send({
//             errors: [{ msg: "server error" }]
//         })
//     }
// })

router.get("/", async (req, res) => {
    try {
        // console.log("in profile validation")
        // res.send(req.user)
        const user = await Subgreddiit.find()
        res.send(user)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


router.get("/:id", async (req, res) => {
    try {
        // console.log("in get validation")
        // res.send(req.user)
        const {id} = req.params
        const user = await Subgreddiit.findById(id)
        res.send(user)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


module.exports = router