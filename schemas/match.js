const mongoose = require('mongoose');

const matchCollection = "matches";

const matchSchema = new mongoose.Schema({
    matchType:{
        type: Number,
        required: true,
        min: 5,
        max: 11
    },
    category:{
        type: String,
        required: true
    },
    host:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    address:{
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },    
    fieldName:{
        type: String
    },
    totalPlayers:{
        type: Number,
        required: true,
        min: 10,
        max: 22
    },
    playersNeeded:{
        type: Number,
        required: true
    },
    players:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
    }],
    date:{
        type: Date,
        required: true
    },
    priceByPlayer:{
        type: Number
    },
    matchExtraInfo:{
        type: String
    },
    feedback:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feedbacks'
    },
    matchChat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chats'
    }
})

const Match = mongoose.model(matchCollection, matchSchema);
module.exports = Match