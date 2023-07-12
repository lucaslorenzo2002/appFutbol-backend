const mongoose = require('mongoose');

const matchChatCollection = "chats";

const matchChatSchema = new mongoose.Schema({
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    }],
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
})

const MatchChat = mongoose.model(matchChatCollection, matchChatSchema);
module.exports = MatchChat