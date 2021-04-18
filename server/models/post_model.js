//imports
const mongoose=require('mongoose');

//generate database schema
let Schema = mongoose.Schema;
let postSchema = new Schema({
    poster_id: {
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