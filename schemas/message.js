const mongoose = require('mongoose');

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    message:{
        type: String,
        required: true
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chats'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model(messageCollection, messageSchema);
module.exports = Message