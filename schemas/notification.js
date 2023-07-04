const mongoose = require('mongoose');

const notificationCollection = "notifications";

const notificationSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Notification = mongoose.model(notificationCollection, notificationSchema);
module.exports = Notification