var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Logins = require('../models/login_model');
var Users = require('../models/user_model');
var { check, validationResult } = require('express-validator');
var fs = require('fs');
var secret = JSON.parse(fs.readFileSync('./config.json')).secret;

//single error because we don't really want to tell whoever is trying to log in
//what they got wrong
var error = "Authentication failed";

/**
 * Gets the login info from the client. Determines whether its valid.
 * Issues a token if the login succeeds
 * 
 * Required fields:
 *  username - username of user to log in
 *  password - password of user to log in
 * 
 *  Command to test:
 *  curl -X POST -H "Content-Type: application/json" -d '{"username":"test", "password":"password"}' http://localhost:3000/login
 */
router.post('/login', [
    check('username', 'username is required')
        .not()
        .isEmpty(),
    check('password', 'password is required')
        .not()
        .isEmpty()
], (req,res)=>{
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array());
    }else{
        var getUser;

        //Find the user in question
        Logins.findOne({
            username: req.body.username
        }).then(user => {
            //check if a user was found
            if(!user){
                return res.status(401).json({
                    message: error 
                });
            }
            console.log("found user");

            //get the user information
            Users.findById(user.user_id)
                .then(info => getUser=info);

            console.log("got the user info");

            //Check the inputted password against the saved password
            return bcrypt.compare(req.body.password, user.password);
        }).then(response => {
            //password incorrect
            if(!response){
                return res.status(401).json({
                    message: error 
                });
            }

            //update the login time for the user
            getUser.last_login = Date.now();
            getUser.save().then(function(){
                //Create the token
                var jwToken = jwt.sign({
                    username: getUser.username,
                    userId: getUser._id
                }, secret, {
                    expiresIn: '24hr'
                });

                //send the token to the client
                res.status(200).json({
                    token: jwToken,
                    expiresIn: 86400,
                    msg: getUser
                });
            });
        }).catch(err => {
            console.log(error);
            console.log("big problem");
            return res.status(401).json({
                message: error 
            });
        });
    }
});

module.exports = router;