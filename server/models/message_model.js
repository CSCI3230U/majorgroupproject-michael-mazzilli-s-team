//imports
const mongoose=require('mongoose');

//generate database schema
let Schema = mongoose.Schema;
let messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    contents: {
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