const express = require('express');
const Registration = require('../models/registration.model');
const router = express.Router();
const auth = require("../middleware/auth")
const { ObjectId } = require('mongodb');


router.put("/:id", async (req, res) => {
    try {
        // console.log(username,)
        // console.log("req = ", req.body)
        const { id } = req.params
        console.log("id:",id)
        // const objectId = new ObjectId(id);
        const objectId = new ObjectId(id.toString());

        const { updatedfirstname, updatedlastname, updatedusername, updatedage, updatedphonenumber } = req.body;
        console.log(req.body)
        // const objectId = ObjectId(id);
        const user = await Registration.findById(objectId)


        // const user = await Registration.findOne({ username });
        console.log(user)
        console.log("firstname logged =", req.body.firstName)
        
        // const user = await Registration.findById(id);
        // console.log(user)= await Registration.findOne({ username })
        if (req.body.firstName != '') {
            // console.log("in fname else")
            user.firstname = req.body.firstName;
            console.log("firstname in else = ", user.firstname)
        }
        if (req.body.lastName != '') {
            user.lastname = req.body.lastName;
            console.log("lastname in else = ", user.lastname)
        }
        if (req.body.username != '') {
            user.username = req.body.username;
        }

        if (req.body.age != '') {
            user.age = req.body.age
        }
        if (req.body.phoneNumber != '') {
            user.phonenumber = req.body.phoneNumber
        }

        await user.save();
        res.send(user)

    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
});

module.exports = router;
