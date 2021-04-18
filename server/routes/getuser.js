/*
    Handles all requests to the <domain>/getuser endpoint

    Valid Endpoints:
        GET:
            <domain>/getuser/:uid
            <domain>/getuser
        POST:
            N/A
*/
var express = require('express');
var router = express.Router();
var userModel = require('../models/user_model');

/** gets a user's public data by their id. 
 *
 *  RETURN: user object with public data
 * 
 *  Testing:
 *       curl http://localhost:3000/getuser/<uid of desired user>
 */
router.get('/getuser/:uid', (req,res) => {
    //get and ensure there are queries
    userModel.Users.find({uid: req.params.uid}).then(function(err, result){
        console.log("fetching user");
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
});

/*
    get public information for all users

    RETURN: Array of user objects with public information
*/
router.get('/getuser', (req, res) => {
    userModel.Users.find().then(function(err,result){
        console.log("fetching user");
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
});

//Export the routes
module.exports = router;