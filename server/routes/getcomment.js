var express = require('express');
var router = express.Router();

var Comments = require('../models/comment_model');
var Users = require('../models/user_model');

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

module.exports = router;