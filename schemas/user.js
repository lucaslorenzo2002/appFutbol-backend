const mongoose = require('mongoose');

const userCollection = "users";

const userSchema = new mongoose.Schema({
    username:{
        type: String
    },
    password:{
        type: String,
        minlength: 8
    },
    mail:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'porfavor escriba un mail valido',
        ] 
    },
    photo:{
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            default:[-34.3975145, -58.706391]//sacar el default
        }
    },
    maxDistance:{
        type: Number,
        default: 5,
        min: 1
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    position:{
        type: String
    },
    byo:{
        type: String,
        max: 300
    },
    schedule:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schedules'
    },
    friends:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'friends'
    }
})


const User = mongoose.model(userCollection, userSchema);
module.exports = User