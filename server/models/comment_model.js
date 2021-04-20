var mongoose = require('mongoose');

/**
 * Collection to keep track of all the comments on the platform
 * has reference to parent post, and original author
 */
//generate database schema
let Schema = mongoose.Schema;
let commentSchema = new Schema({
    parent: {
        type: Schema.Types.ObjectId,
        ref: "posts",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    date_contributed: {
        type: Date, 
        default: Date.now
    },
    contents: {
        type: String,
        required: true
    }
});

Comments =  mongoose.model('comments', commentSchema);
module.exports = Comments;