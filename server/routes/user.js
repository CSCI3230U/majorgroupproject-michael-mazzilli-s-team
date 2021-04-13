var express = require('express');
var router = express.Router();
var userModel = require('../models/user_model');

router.get('/getuser', (req,res) => {
    //get and ensure there are queries
    var query = req.query;
    if(query != []){
        userModel.Users.find({uid: query.uid}).then(function(err, result){
            console.log("fetching user");
            if(err){
                res.send(err);
            }else{
                res.send(result);
            }
        });
    }
});

module.exports = router;