//imports
const mongoose=require('mongoose');

//generate database schema
let Schema = mongoose.Schema;
let postSchema = new Schema({
    poster_id: String,
    post_id: String,
    date_contributed: {type: Date, default: Date.now},
    body: String,
    score: Number,
    Replies: [{
        uid: String,
        reply_id: String,
        date_contributed: Date,
        body: String,
        score: Number
    }]
})

//export model for use later
module.exports.Posts = mongoose.model('posts', postSchema);