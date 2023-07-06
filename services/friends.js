const FriendsDAO = require('../database/friends');
const connection = require('../config/mongoConfig');

class FriendsApi{
    constructor(){
        this.friendsDAO = new FriendsDAO(connection)
    }

    async createFriendsList(user){
        return await this.friendsDAO.createFriendsList(user)
    }

    async getFriendsList(userId){
        return await this.friendsDAO.getFriendsList(userId)
    }

    async addPlayerToFriendsList(userId, playerId){
        return await this.friendsDAO.addPlayerToFriendsList(userId, playerId)
    }

    async removePlayerFromFriendsList(userId, playerId){
        return await this.friendsDAO.removePlayerFromFriendsList(userId, playerId)
    }

}

module.exports = FriendsApi