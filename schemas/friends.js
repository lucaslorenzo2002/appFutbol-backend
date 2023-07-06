const mongoose = require('mongoose');

const friendsCollection = "friends";

const friendsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
})


const Friends = mongoose.model(friendsCollection, friendsSchema);
module.exports = Friends