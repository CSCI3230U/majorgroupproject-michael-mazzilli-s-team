var express = require('express');
var postModel = require('../models/post_model');
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
        //find the parent post
        postModel.Posts.findOne({post_id: req.params.id}, (err, result) => {
            if(err){
                res.json({
                    error: err
                });
            }else{
                //create new comment
                var newComment = {
                    poster_id: req.params.id,
                    reply_id: uuidv4(),
                    contents: req.body.contents,
                    date_contributed: Date.now()
                };

                //add the new comment to the database
                result.replies.push(newComment);
                result.save().then((response) => {
                    res.status(201).json({
                        error:error
                    });
                }).catch(error => {
                    res.status(500).json({
                        error:error
                    });
                });
            }
        });
    }
});

module.exports = router;