const express = require('express');
const Registration = require('../models/registration.model');
const auth = require("../middleware/auth")
const router = express.Router();


router.get("/:id", async (req, res) => {
    try {
        console.log("in followers")
        // res.send(req.user)
        const { id } = req.params
        // console.log(id)
        const user = await Registration.findById(id)
        // console.log("user", user)
        console.log(user.followers)
        const followersUsernames = []
        console.log(user.followers.length)

        for (let i = 0; i < user.followers.length; i++) {
            const followerid = user.followers[i];
            // followersUsernames[i][0] = follower;
            // followersUsernames[i].push( follower);

            const followerUser = await Registration.findById(followerid.toString());
            // followersUsernames[i][1] = followerUser;
            // followersUsernames[i].push( followerUser);
            const followerDetails = [followerid, followerUser.firstname];
            followersUsernames.push(followerDetails);
        }
        res.send(followersUsernames)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        console.log("in followers put")
        const { delfollower } = req.body
        console.log(delfollower)
        // res.send(req.user)
        const { id } = req.params
        // console.log(id)
        const user = await Registration.findById(id)
        console.log("user.followers=", user.followers)
        var followersUsernames = user.followers
        console.log(followersUsernames)

        // for (let i = 0; i < user.followers.length; i++) {
        //     const follower = user.followers[i];
        //     console.log("id = ", follower)
        //     const followerUser = await Registration.findById(follower.toString());
        //     console.log(followerUser.firstname);
        //     followersUsernames.push(followerUser.firstname)
        // }
        console.log(delfollower)
        let index = followersUsernames.indexOf(delfollower);
        console.log("index = ", index)
        if (index !== -1) {
            followersUsernames.splice(index, 1);
        }
        // console.log("after splice =", followersUsernames)
        const deletedFollower = await Registration.findByIdAndUpdate(id, { followers: followersUsernames })
        console.log(deletedFollower)
        res.send(deletedFollower)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})

module.exports = router