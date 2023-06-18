const mongoose = require('mongoose');

const resetPasswordTokenCollection = "resetPasswordTokens";

const resetPasswordTokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    token:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 3600
    }
})


const ResetPasswordToken = mongoose.model(resetPasswordTokenCollection, resetPasswordTokenSchema);
module.exports = ResetPasswordToken