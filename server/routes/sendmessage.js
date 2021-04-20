var express = require('express');
var Comments = require('../models/comment_model');
var Posts = require('../models/post_model');
var router = express.Router();
var {v4: uuidv4} = require('uuid');
var {check, validationResult} = require('express-validator');

/**
 * Adds a new comment to an existing post
 * 
 * Required Parameters:
 *  id - id of parent post
 *  contents - text body of comment
 * 
 * Example:
 *  curl -X POST -H "Content-Type: application/json" -d '{"token":"<token>", "contents":"Look ma Im commenting"}' http://localhost:3000/submitcomment/4bc43eb5-1c03-41b4-8155-d61f7954393c
 */
router.post('/submitcomment/:id', [
    check('id', 'post id is required')
        .not()
        .isEmpty(),
    check('contents', 'comments require contents')
        .not()
        .isEmpty()
], (req, res) => {
    //Validate that the input was correct
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        //Create a new comment document
        const newComment = new Comments({
            parent: req.params.id,
            author: req.decoded.userId,
            contents: req.body.contents
        })
        //save the comment
        newComment.save().catch(err => {
            res.status(500).json({
                error:err
            });
        });

        //Find the original post
        Posts.findById(newComment.parent)
            .then((result) => {
                result.replies.push(newComment._id);
                result.save();
        }).catch(err => {
            res.status(500).json({
                error:error
            });
        });

        res.status(201).send("Saved Message");
    }
});

module.exports = router;