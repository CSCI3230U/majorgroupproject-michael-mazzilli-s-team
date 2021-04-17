//imports
const mongoose=require('mongoose');

//generate database schema. Don't worry password should be hashed...
let Schema = mongoose.Schema;
let loginSchema = new Schema({
    uid: String,
    username: String,
    password: String
})

module.exports.Logins = mongoose.model('logins', loginSchema);