const mongoose = require('mongoose');

const feedbackCollection = "feedbacks";

const feedbackSchema = new mongoose.Schema({
    match:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matches'
    },
    //usuarios registrados
    mvp:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    //usuarios registrados
    matchOrganization:{
        type: Number,
        min: 1,
        max: 5,
    },
    //usuarios registrados
    matchOrganizationOpinion:{
        type: String,
    },
    //solo host
    playersPresent:{
        type: [Boolean],
        default: true,
    },
    //solo host
    result:{
        type: String,
    }
})

const Feedback = mongoose.model(feedbackCollection, feedbackSchema);
module.exports = Feedback