const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger');
const FeedbacksApi = require('../services/feedbacks');
const User = require('../schemas/user');

class FeedbacksController{
    constructor(){
        this.feedbacksApi = new FeedbacksApi()
    }

    createFeedback = asyncHandler(async(req, res) => {
        try {            
            
        } catch (error) {
            res.json({error}).status(500)
        }
    })
}

module.exports = FeedbacksController