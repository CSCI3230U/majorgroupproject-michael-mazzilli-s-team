var express = require('express');
var router = express.Router();

var Comments = require('../models/comment_model');
var Posts = require('../models/post_model');
var Users = require('../models/user_model');

/**
 * Retrieves the comments for a specific post
 */
router.get('/getcomments/:id', (req, res) => {
    Comments.find({parent: req.params.id})
        .populate('author')
        .then((err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        })
})

/**
 * Retrieves all the posts with comments from a specific user
 */
router.get('/getcomments/user/:id', (req, res) => {
    console.log("getting comments from user");
    Comments.find({author: req.params.id})
        .populate({
            path: 'parent',
            populate: [{path: 'author'},{
                path: 'replies',
                populate: { path: 'author' }
            }]
        }).then((result,err) => {
            var posts = result.map(function(post){ return post.parent; });
            console.log(posts);
            res.send(posts);
        })
});



module.exports = router;