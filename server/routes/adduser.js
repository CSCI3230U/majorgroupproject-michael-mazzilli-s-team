var express = require('express');
var router = express.Router();
var Users = require('../models/user_model');
var Logins = require('../models/login_model');
var {v4 : uuidv4} = require('uuid');
var bcrypt = require('bcrypt');
var { check, validationResult } = require('express-validator');

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
router.post('/adduser', 
    [
        check('username', 'username is required')
            .not()
            .isEmpty(),
        check('password', 'password is required')
            .not()
            .isEmpty(),
        check('first', 'first is required: supply user first name')
            .not()
            .isEmpty(),
        check('last', 'last is required: supply user last name')
            .not()
            .isEmpty()
    ], 
    (req,res) => {
        var errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).jsonp(errors.array());
        }else{
            //hash the password right away
            bcrypt.hash(req.body.password, 10).then((hash) => {
                //Create a new user document using the existing schema
                const newUser = new Users({
                    username: req.body.username,
                    name: {
                        first: req.body.first,
                        last: req.body.last
                    },
                    picture: `https://robohash.org/${req.body.username}`,
                    last_login: Date.now(),
                    date_created: Date.now()
                })

                //Create a new login document using the existing schema
                const newLogin = new Logins({
                    user_id: newUser._id,
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
        }
});

//export for use in index.js
module.exports = router;