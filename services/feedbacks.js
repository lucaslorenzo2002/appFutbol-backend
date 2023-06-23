const FeedbacksDAO = require('../database/feedback');
const connection = require('../config/mongoConfig');

class FeedbacksApi{
    constructor(){
        this.FeedbacksDAO = new FeedbacksDAO(connection)
    }

    async createFeedback(matchId){
        return await this.FeedbacksDAO.createFeedback(matchId)
    }
}

module.exports = FeedbacksApi