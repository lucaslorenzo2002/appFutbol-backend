const mongoose = require('mongoose');

const scheduleCollection = "schedules";

const scheduleSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    matchesashost:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matches'
    }],
    matchesasaplayer:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matches'
    }],
    completedmatches:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matches'
    }]
})

const Schedule = mongoose.model(scheduleCollection, scheduleSchema);
module.exports = Schedule