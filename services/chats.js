const ChatsDAO = require('../database/chats');
const connection = require('../config/mongoConfig');

class ChatsApi{
    constructor(){
        this.chatsDAO = new ChatsDAO(connection)
    }

    async createChat(matchId, messages, participants){
        return await this.chatsDAO.createChat(matchId, messages, participants)
    }

    async addPlayerToMatchChat(matchId, playerId){
        return await this.chatsDAO.addPlayerToMatchChat(matchId, playerId)
    }

    async newMessageInChat(chatId, message){
        return await this.chatsDAO.newMessageInChat(chatId, message)
    }

    async getMyChats(userId){
        return await this.chatsDAO.getMyChats(userId)
    }

    async getChat(chatId){
        return await this.chatsDAO.getChat(chatId)
    }

}

module.exports = ChatsApi