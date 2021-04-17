var express = require('express');
var router = express.Router();
var userModel = require('../models/user_model');
var loginModel = require('../models/login_model');
var {v4 : uuidv4} = require('uuid');
var bcrypt = require('bcrypt');

/**
 * Adds new user to the database. Creates a document in the user collection and login collection
 * 
 * Required Fields:
 *  first - new user's first name
 *  last - new user's last name
 *  username - new user's username
 *  password - new user's password (sent plain for now... might be something to look into further)
 * 
 * Command to test:
 *  curl -X POST -H "Content-Type: application/json" -d '{"username":"test", "first":"Josh", "last":"Slosh", "password":"password"}' http://localhost:3000/adduser
 */
router.post('/adduser', (req,res) => {
    var newUID = uuidv4(); //generate unique user ID

    //hash the password right away
    bcrypt.hash(req.body.password, 10).then((hash) => {
        //Create a new user document using the existing schema
        const newUser = new userModel.Users({
            uid: newUID,
            username: req.body.username,
            name: {
                first: req.body.first,
                last: req.body.last
            },
            picture: `https://robohash.org/${newUID}`,
            last_login: Date.now()
        })

        //Create a new login document using the existing schema
        const newLogin = new loginModel.Logins({
            uid: newUID,
            username: req.body.username,
            password: hash
        })

        //save the new documents, send a response
        newUser.save().then((response1) => {
            newLogin.save().then((response2) => {
                res.status(201).json({
                    error: error
                });
            }).catch(error => {
                res.status(500).json({
                    error:error
                });
            });
        }).catch(error => {
            res.status(500).json({
                error:error
            });
        });
    });
});

//export for use in index.js
module.exports = router;