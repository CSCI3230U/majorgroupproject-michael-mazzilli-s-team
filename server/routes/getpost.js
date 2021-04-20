var express = require('express');
var router = express.Router();

var Posts = require('../models/post_model');

/**
 * Get all posts in the database
 * 
 * Example:
 *  curl http://<domain>/getpost
 */
router.get('/getpost', (req, res) => {
    Posts.find()
    .populate('author')
    .populate({
        path:'replies',
        populate: {
            path: 'author',
        }
    })
    .then(function(result,err){
        if(err){
            res.send(err);
        }else{
            res.send(result.reverse());
        }
    });
});

/**
 * Get posts by id. Returns a unique post
 * 
 * Required Parameters:
 *  id - in url, id of the post
 * 
 * Example:
 *  curl http://<domain>/getpost/<id>
 */
router.get('/getpost/:id', (req,res) => {
    Posts.findById(req.params.id)
        .populate('author')
        .populate('replies')
        .then((err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
});

/**
 * Get all posts by a specified user
 * 
 * Parameters:
 *  id - in url, id of user
 * 
 * Example:
 *  curl http://<domain>/getpost/user/<id>
 */
router.get('/getpost/user/:id', (req,res) => {
    Posts.find({'author': req.params.id})
        .populate('author')
        .populate('replies')
        .then(function(err,result){
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
    });
});

module.exports = router;