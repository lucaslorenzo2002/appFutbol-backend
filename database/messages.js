const Message = require("../schemas/message");
const logger = require('../utils/logger');

class MessagesDAO{
    constructor(connection){
        this.connection = connection
    }

    async createMessage(from, message, chatId){
            try{
                return await Message.create({from, message, chat: chatId})
            }catch(err){
                logger.info(err)
            }
    }

    async deleteMessage(messageId){
            try{
                    return await Message.delete({_id: messageId})
            }catch(err){
                logger.info(err)
            }
    }
}

module.exports = MessagesDAO