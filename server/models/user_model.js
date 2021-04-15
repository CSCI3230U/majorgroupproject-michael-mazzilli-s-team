//imports
const mongoose=require('mongoose');

//generate database schema
let Schema = mongoose.Schema;
let userSchema = new Schema({
    uid: String,
    username: String,
    name: {
        first: String,
        last: String
    },
    friends: [{
        uid: String, 
        username: String
    }],
    picture: String,
    last_login: Date,
    settings: Array
})

//export model for use later
module.exports.Users = mongoose.model('users', userSchema);