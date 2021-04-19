//imports
const mongoose=require('mongoose');

/**
 * This collection is supposed to hold all the login information for each user
 * Thought it would be beneficial to keep this separate from the other data
 * that would be frequently requested
 */

//generate database schema. Don't worry password should be hashed...
let Schema = mongoose.Schema;
let loginSchema = new Schema({
    uid: {
        type:String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

module.exports.Logins = mongoose.model('logins', loginSchema);