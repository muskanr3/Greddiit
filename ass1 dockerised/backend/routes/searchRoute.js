const express = require('express');
const Registration = require('../models/registration.model');
const auth = require("../middleware/auth")
const router = express.Router();
const Subgreddiit = require("../models/mySubgreddiits.models")

// router.get("/:name", async (req, res) => {
//     try {
//         const { name } = req.params
//         // console.log("in profile validation")
//         // res.send(req.user)
//         const query = { name: name }
//         const user = await Subgreddiit.find(query)
//         res.send(user)
//     } catch (err) {
//         console.log("error: ", err)
//         res.status(500).send({
//             errors: [{ msg: "server error" }]
//         })
//     }
// })

router.get('/:query', (req, res) => {
    const {query} = req.params;
    console.log(query)
    Subgreddiit.find({ name: { $regex: query, $options: "i" } })
      .then(subreddits => {
        res.json(subreddits);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  

module.exports = router