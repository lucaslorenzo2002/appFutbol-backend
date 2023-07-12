const Chat = require("../schemas/chat");
const logger = require('../utils/logger');

class ChatsDAO{
    constructor(connection){
        this.connection = connection
    }

    async createChat(messages, participants){
            try{
                return await Chat.create({messages, participants})
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

    async getChat(chatId){
            try{
                return await Chat.findOne({_id: chatId}).populate('messages').populate('participants')
            }catch(err){
                logger.info(err)
            }
    }

}

module.exports = ChatsDAO