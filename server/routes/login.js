var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var router = express.Router();
var loginModel = require('../models/login_model');
var userModel = require('../models/user_model');

router.post('/signin', (req,res)=>{
    var getUser;

    //Find the user in question
    loginModel.Logins.findOne({
        username: req.body.username
    }).then(user => {
        //check if a user was found
        if(!user){
            return res.status(401).json({
                message: "No user found"
            });
        }
        //get the user information
        userModel.Users.findOne({
            uid: user.uid
        }).then(info => getUser=info);

        //Check the inputted password against the saved password
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        //password incorrect
        if(!response){
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        //Create the token
        var jwToken = jwt.sign({
            username: getUser.username,
            userId: getUser.uid
        }, 'client secret, gotta change this around later', {
            expiresIn: '1h'
        });

        //send the token to the client
        res.status(200).json({
            token: jwToken,
            expiresIn: 3600,
            msg: getUser
        });
    }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: "Some other problem good luck"
        });
    });
});

module.exports = router;