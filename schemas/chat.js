const mongoose = require('mongoose');

const chatCollection = "chats";

const chatSchema = new mongoose.Schema({
    matchId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matches'
    },
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    }],
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
})

const Chat = mongoose.model(chatCollection, chatSchema);
module.exports = Chat