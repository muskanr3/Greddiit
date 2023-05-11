const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/auth');
const Registration = require('../models/registration.model');
router.post('/signup', signup);
// router.post('/signin', signin);
// router.post('/profile', );\
// router.post('/subgreddiit', Subgreddiit);
// router.post('/followers', Followers);
// router.post('/following', Following);

// router.post("/signin", async (req, res) => {
//     try {
//         const { username, password } = req.body
//         const user = await Registration.findOne({ username })
//         if (!user) {
//             console.log("user not found")
//             return res.status(400).send({ errors: [{ msg: "No user found" }] });
//         }
//         const matchedUser = await user.checkPassword(password)
//         if (matchedUser) {
//             const token = user.createToken()
//             return res.send({ token })
//         }
//     } catch (error) {
//         console.log("bye");
//         res.status(500).send({ errors: [{ msg: "Server Error" }] });
//         console.log(error);

//     }
// })

router.post("/signin", async (req, res) => {
    // console.log("bregor try")
    try {
        // console.log(req.body)
        const { username, password } = req.body
        // console.log(username,)
        const user = await Registration.findOne({ username });
        // console.log(user)
        if (!user) {
            console.log("no user")
            return res.status(400).send({ errors: [{ msg: "user not found" }] })
        }
        // console.log("bi")

        const matchedUser = await user.checkPassword(password)

        if (matchedUser) {
            const token = user.createToken();
            return res.send({ token })
        }
        return res.status(400).send({
            errors: [{ msg: "invalid password" }]
        })
    } catch (err) {
        console.log("error: ", err)
        res.status(500).send({
            errors: [{ msg: "server error" }]
        })
    }
})

module.exports = router;