const express = require('express')
const router = express.Router();
const tweets = require('../data/tweets.js')
const error = require('../utilities/error.js')

//GET ONE TWEET
router.get('/:id', (req, res, next) => {
    const tweet = tweets.find(t => t.id == req.params.id)
    if (tweet) res.json({ tweet });
    else next()
  })

//UPDATE A TWEET
router.patch('/:id', (req, res, next) => {
    const tweet = tweets.find((t, i) => {
        if(t.id == req.params.id){
            for(const key in req.body){
                tweets[i][key] = req.body[key]
            }
            return true
        }
    })
    if(tweet) res.json(tweet)
    else next()
})

//DELETE A TWEET
router.delete("/:id", (req, res, next) => {
    const tweet = tweets.find((t, i) => {
        if(t.id == req.params.id){
            tweets.splice(i, 1)
            return true
        }
    })
    if(tweet) res.json(tweet)
    else next()
})

module.exports = router