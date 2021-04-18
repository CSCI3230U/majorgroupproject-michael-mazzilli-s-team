//imports
var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//generate database schema
let Schema = mongoose.Schema;
let userSchema = new Schema({
    uid: {
        type:String,
        require: true
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: Object,
        require: true,
        type: {
            first: String,
            last: String
        }
    },
    friends: {
        type: [{
        uid: String, 
        username: String
        }],
        unique: true
    },
    picture: {
        type: String,
        default: `https://robohash.org/default`
    },
    last_login: Date,
    date_created: Date,
    settings: Array
})

//export model for use later
userSchema.plugin(uniqueValidator, { message: "Username taken" });
module.exports.Users = mongoose.model('users', userSchema);