/* const MatchChat = require("../schemas/matchChat");
const logger = require('../utils/logger');

class MatchesChatDAO{
    constructor(connection){
        this.connection = connection
    }

    async createMatchChat(matchId, messages, participants){
            try{
                return await MatchChat.create({matchId, messages, participants})
            }catch(err){
                logger.info(err)
            }
    }

    async newMessageInChat(chatId, message){
        try {
            return await Chat.findByIdAndUpdate(chatId, {$push :{messages: message}})
        } catch (err) {
            logger.info(err)
        }
    }

    async getMyChats(userId){
            try{
                return await Chat.find({participants: userId})       
            }catch(err){
                logger.info(err)
            }
    }

    async getMatchChat(chatId){
            try{
                return await Chat.findOne({_id: chatId}).populate('messages').populate('participants')
            }catch(err){
                logger.info(err)
            }
    }

}

module.exports = MatchesChatDAO */