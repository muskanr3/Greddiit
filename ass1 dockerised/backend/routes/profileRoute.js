const express = require('express');
const Registration = require('../models/registration.model');
const auth = require("../middleware/auth")
const router = express.Router();


router.get("/", auth, async (req, res) => {
    try {
        // console.log("in profile validation")
        // res.send(req.user)
        const user = await Registration.findById(req.user.id)
        res.send(user)
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})

module.exports = router