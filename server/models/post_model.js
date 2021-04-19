//imports
const mongoose=require('mongoose');

//generate database schema
let Schema = mongoose.Schema;
let postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
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
        author: Schema.Types.ObjectId,
        reply_id:String,
        date_contributed: Date,
        contents: String,
    }]
});

//export model for use later
module.exports.Posts = mongoose.model('posts', postSchema);