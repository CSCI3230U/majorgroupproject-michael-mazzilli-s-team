//imports
var mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

/**
 * Keeps track of all users in the system
 * Has reference to Logins and all friends
 */
//generate database schema
let Schema = mongoose.Schema;
let userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        require: true,
        type: {
            first: String,
            last: String
        }
    },
    picture: {
        type: String,
        default: `https://robohash.org/default`
    },
    last_login: {
        type: Date,
        default: Date.now()
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    friends: [
        {type: Schema.Types.ObjectId, ref: "users"}
    ],
    settings: Array
})

//export model for use later
userSchema.plugin(uniqueValidator, { message: "Username taken" });
const Users = mongoose.model('users', userSchema);
module.exports = Users;