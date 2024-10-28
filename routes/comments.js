const express = require('express')
const router = express.Router();
const comments = require('../data/comments.js')
const error = require('../utilities/error.js')

// GET comments for a specific tweet
router.get('/:id/comments', (req, res, next) => {
    const tweetId = req.params.id;
    
    // Find comments for the specified tweetId
    const tweetComments = comments.filter(c => c.tweetId == tweetId);
    
    if (tweetComments.length > 0) {
      res.json({ comments: tweetComments });
    } else {
      next(error(404, "No comments found"));
    }
  });

module.exports = router