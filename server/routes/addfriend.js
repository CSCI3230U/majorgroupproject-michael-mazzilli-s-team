var express = require('express')
var userModel = require('../models/user_model');
var router = express.Router();

/**
 * Adds user to currently logged in user's friend list
 * 
 * Required:
 *  token - in body or as query. access token from loggin in
 *  id - parameter, uid of friend to add
 * 
 * Test:
 *  curl -X POST -H "Content-Type: application/json" -d '{"token":"<token>"}' http://localhost:3000/addfriend/<friend id>
 */
router.post('/addfriend/:id', (req, res) => {
    //get the user to add as friend
    userModel.Users.findOne({
        uid: req.params.id
    }).then(friend => {
        //get the currently logged in user
        userModel.Users.findOne({
            uid: req.decoded.userId
        }).then(user => {
            //create an updated friends array
            var newFriends = user.friends;

            //ensure the user is not already a friend
            var present = false;
            for(var i=0; i<newFriends.length; i++){
                present = (newFriends[i].uid === friend.uid);
                if(present){ break; }
            }
            if(!present){
                newFriends.push({
                    uid: friend.uid,
                    username: friend.username
                });

                //update document
                user.friends = newFriends;
                user.save().then((response) => {
                    res.status(201).json({
                        error: error
                    });
                }).catch(error => {
                    res.status(500).json({
                        error:error
                    });
                });
            }else{
                res.status(403).json({
                    error: "Users are already friends"
                });
            }
        });
    });
});

module.exports = router;