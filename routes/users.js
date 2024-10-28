const express = require("express")
const router = express.Router()
const users = require("../data/users.js")
const error = require("../utilities/error.js")

//GET ALL
router.get('/', (req, res) => {
    res.json({ users });
})

//GET ONE
router.get('/:id', (req, res, next) => {
    const user = users.find(u => u.id == req.params.id)
    if (user) res.json({ user })
    else next()
})

//CREATE ONE USER
router.post('/', (req, res, next) => {
    // Within the POST request route, we create a new
    // user with the data given by the client.
    // We should also do some more robust validation here,
    // but this is just an example for now.
    if (req.body.name && req.body.username && req.body.email) {
        const foundUser = users.find(u => u.username === req.body.username)
        if (foundUser) {
            return next(error(400, 'Username Already Taken'))
        }

        const user = {
            id: users[users.length - 1].id + 1,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        }

        users.push(user)
        res.json(user)
    } else {
        next(error(400, 'Insufficient Data'))
    }
})

//DELETE USER
router.delete("/:id", (req, res, next) => {
    // const user = user.find((u, i) => {
    //   if (u.id == req.params.id) {
    //     users.splice(i, 1)
    //      return true
    //   }
    // })

    const userIndex = users.findIndex(u => u.id == req.params.id)

    if (userIndex !== -1) {
        const deletedUser = users[userIndex]
        users.splice(userIndex, 1)
        res.json(deletedUser)
    } else {
        next()
    }
})

module.exports = router