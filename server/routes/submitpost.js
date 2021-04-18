var express = require('express');
var postModel = require('../models/post_model');
var router = express.Router();
var {v4: uuidv4} = require('uuid');
var {check, validationResult } = require('express-validator');

/**
 * Creates a new post attached to the currently logged in user
 * 
 * Required Fields:
 *  contents - Text body of the post
 *  token - access token of currently logged in user
 * 
 * Command to test:
 *  curl -X POST -H "Content-Type: application/json" -d '{"token":"<token>", "contents":"<post contents>"}' http://<domain>/submitpost
 */
router.post('/submitpost',
    [
        check('contents', 'post contents are required')
            .not()
            .isEmpty()
    ],
    (req,res) => {
    //Create a post object from a post schema
    var newPost = postModel.Posts({
        poster_id: req.decoded.userId,
        post_id: uuidv4(),
        contents: req.body.contents
    })

    //save the post, return how it went
    newPost.save().then((response) => {
        res.status(201).json({
            error: error
        });
    }).catch(error => {
        res.status(500).json({
            error:error
        });
    });
});

//export for use later
module.exports = router;