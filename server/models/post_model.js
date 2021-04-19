//imports
const mongoose=require('mongoose');

//generate database schema
let Schema = mongoose.Schema;
let postSchema = new Schema({
    poster_id: {
        type: String,
        required: true
    },
    poster_username: {
        type: String, 
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    date_contributed: {
        type: Date, 
        default: Date.now
    },
    contents: {
        type: String,
        required: true
    },
    score: Number,
    replies:[{
        poster_id: String,
        poster_username: String,
        reply_id:String,
        date_contributed: Date,
        contents: String,
    }]
});

//export model for use later
module.exports.Posts = mongoose.model('posts', postSchema);