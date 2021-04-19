//imports
const mongoose=require('mongoose');
const Users = require('./user_model');

//generate database schema
let Schema = mongoose.Schema;
let postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref:Users,
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
        author: {type: Schema.Types.ObjectId, ref:Users},
        reply_id:String,
        date_contributed: Date,
        contents: String,
    }]
});

//export model for use later
const Posts =  mongoose.model('posts', postSchema);
module.exports = Posts;