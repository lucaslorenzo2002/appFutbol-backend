const Chat = require("../schemas/chat");
const logger = require('../utils/logger');

class ChatsDAO{
    constructor(connection){
        this.connection = connection
    }

    async createChat(matchId, messages, participants){
            try{
                return await Chat.create({matchId, messages, participants})
            }catch(err){
                logger.info(err)
            }
    }

    async addPlayerToMatchChat(matchId, playerId){
        try{
            return await Chat.updateOne({matchId}, {$push :{participants: playerId}})
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
                return await Chat.find({participants: userId}).populate('participants')       
            }catch(err){
                logger.info(err)
            }
    }

    async getChat(chatId){
            try{
                return await Chat.findOne({_id: chatId}).populate('messages').populate('participants')
            }catch(err){
                logger.info(err)
            }
    }

}

module.exports = ChatsDAO