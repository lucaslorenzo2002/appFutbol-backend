const MessagesDAO = require('../database/messages');
const ChatsApi = require('./chats');
const connection = require('../config/mongoConfig');

class MessagesApi{
    constructor(){
        this.messagesDAO = new MessagesDAO(connection)
        this.chatsApi = new ChatsApi()
    }

    async createMessage(from, message, chatId){
        const newMessage = await this.messagesDAO.createMessage(from, message, chatId);
        return await this.chatsApi.newMessageInChat(chatId, newMessage) 
    }

    async deleteMessage(messageId){
        return await this.messagesDAO.deleteMessage(messageId)
    }

}

module.exports = MessagesApi