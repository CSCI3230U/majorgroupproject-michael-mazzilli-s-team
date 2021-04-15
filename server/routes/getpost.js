/*
    Handles all requests to the <domain>/getpost endpoint

    Valid Endpoints:
        GET:
        POST:
*/
var express = require('express');
var router = express.Router();
var postModel = require('../models/post_model');

/*
    Get all the posts

    Return: array of post objects
*/
router.get('/getpost', (req, res) => {
    postModel.Posts.find().then(function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
});

/*
    Get posts by specific user

    return Array of post objects
*/
router.get('/getpost/user/:id', (req,res) => {
    postModel.Posts.find({poster_id: req.params.id}).then(function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
});