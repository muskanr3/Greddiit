const express = require('express');
const Registration = require('../models/registration.model');
const auth = require("../middleware/auth");
const Subgreddiit = require('../models/mySubgreddiits.models');
const router = express.Router();


router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { joinee } = req.body
        // console.log("in profile validation")
        // res.send(req.user)
        const user = await Subgreddiit.findById(id)
        // const joined = []
        // console.log("joinee = ", joinee)
        // console.log("before", user)
        // console.log(user.requested.includes(joinee))

        if (!user.requested.includes(joinee)) {
            user.requested.push(joinee)
            console.log(user)
            user.save()
            res.send(user)
        }
        else {
            // console.log("error: ", err)
            res.status(500).send({
                errors: [{ msg: "server error" }]
            })
        }
        // console.log("after", user)

    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        // const user = await Subgreddiit.findOne({ name: name })
        const user = await Subgreddiit.findById(id)
        
        const requestedUsernames = []
        console.log(user.requested.length)

        for (let i = 0; i < user.requested.length; i++) {
            const requestedid = user.requested[i];
            const requestedUser = await Registration.findById(requestedid);
            const requestedDetails = [requestedid, requestedUser.firstname];
            requestedUsernames.push(requestedDetails);
        }
        console.log("after", user)

        res.send(requestedUsernames)

    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


router.put("/accept/:id", async (req, res) => {
    try {
        console.log("in followers put")
        const { acceptee } = req.body
        console.log(acceptee)
        // res.send(req.user)
        const { id } = req.params
        // console.log(id)
        const sg = await Subgreddiit.findById(id)
        console.log("user.followers=", sg.followers)
        var requestedIds = sg.requested
        console.log(requestedIds)

        // console.log(delfollower)
        let index = requestedIds.indexOf(acceptee);
        console.log("index = ", index)
        if (index !== -1) {
            requestedIds.splice(index, 1);

            sg.followers.push(acceptee)
            sg.save()
        }
        res.send(sg)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})


router.put("/reject/:id", async (req, res) => {
    try {
        // console.log("in followers put")
        const { rejectee } = req.body
        console.log(rejectee)
        // res.send(req.user)
        const { id } = req.params
        // console.log(id)
        const sg = await Subgreddiit.findById(id)
        console.log("user.followers=", sg.followers)
        var requestedIds = sg.requested
        console.log(requestedIds)

        // console.log(delfollower)
        let index = requestedIds.indexOf(rejectee);
        // console.log("index = ", index)
        if (index !== -1) {
            requestedIds.splice(index, 1);
            sg.rejected.push(rejectee)
            sg.save()
        }


        res.send(sg)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})
module.exports = router