const express = require('express');
const Registration = require('../models/registration.model');
const auth = require("../middleware/auth")
const router = express.Router();


router.get("/:id", async (req, res) => {
    try {
        console.log("in following")
        // res.send(req.user)
        const { id } = req.params
        // console.log(id)
        const user = await Registration.findById(id)
        // console.log("user", user)
        console.log(user.following)
        const followingUsernames = []
        console.log(user.following.length)

        for (let i = 0; i < user.following.length; i++) {
            const followingid = user.following[i];
            const followingUser = await Registration.findById(followingid.toString());
            const followingDetails = [followingid, followingUser.firstname];
            followingUsernames.push(followingDetails);
        }
        console.log(followingUsernames);

        // for (i, )
        // res.send(user)
        res.send(followingUsernames)
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
        const { delfollowing } = req.body
        console.log(delfollowing)
        // res.send(req.user)
        const { id } = req.params
        // console.log(id)
        const user = await Registration.findById(id)
        console.log("user.following=", user.following)
        var followingUsernames = user.following
        console.log(followingUsernames)

        console.log(delfollowing)
        let index = followingUsernames.indexOf(delfollowing);
        console.log("index = ", index)
        if (index !== -1) {
            followingUsernames.splice(index, 1);
        }
        console.log("after splice =", followingUsernames)
        var deletedFollowing = await Registration.findByIdAndUpdate(id, { following: followingUsernames })
        console.log(deletedFollowing)
        res.send(deletedFollowing)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})

module.exports = router