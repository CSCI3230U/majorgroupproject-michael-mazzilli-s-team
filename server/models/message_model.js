//imports
const mongoose=require('mongoose');

//generate database schema
let Schema = mongoose.Schema;
let messageSchema = new Schema({
    //uid
    sender: {
        type: String,
        required: true
    },

    //uid
    receiver: {
        type: String,
        required: true
    },

    // profile
    user: {
        firstName: { type: String, required: true},
        lastName:  { type: String, required: true},
        username:  { type: String, required: true},
        picture:   { type: String, default: `https://robohash.org/default`}
    },

    // text contents
    text: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date, 
        default: Date.now()
    },
});

const Messages = mongoose.model('messages', messageSchema);
module.exports = Messages;