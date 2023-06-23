const Feedback = require("../schemas/feedback");
const logger = require('../utils/logger');

class FeedbacksDAO{
    constructor(connection){
        this.connection = connection
    }

    async createFeedback(matchID){
        try {
            return await Feedback.create({match: matchID})
        } catch (err) {
            logger.info(err)
        }
    }

/*     async completeFeedback(id){
        try {
            return await Feedback.findByIdAndUpdate(id, )
        } catch (err) {
            logger.info(err)
        }
    } */

}

module.exports = FeedbacksDAO