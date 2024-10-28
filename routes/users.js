const express = require("express")
const router = express.Router()
const users = require("../data/users.js")
// const error = require("../utilities/error.js")

//GETALL
router.get('/', (req, res) => {
    res.json({users});
  })



module.exports = router