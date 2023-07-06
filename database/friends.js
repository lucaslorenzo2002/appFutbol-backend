const Friends = require("../schemas/friends");
const logger = require('../utils/logger');

class FriendsDAO{
    constructor(connection){
        this.connection = connection
    }

    async createFriendsList(user){
        try {
            return await Friends.create({user});
        } catch (error) {
            logger.info(err);
        }
    }

    async getFriendsList(userId){
        try{
            return await Friends.find({usuario: {_id: userId}}).populate('user').populate('friends').lean()
        }catch(err){
            logger.info(err);
        }
    }
    
    async addPlayerToFriendsList(userId, playerId){
        try {
            return await Friends.updateOne(
                {user: userId}, 
                {$push :{friends: playerId}}
                )
        } catch (error) {
            logger.info(error);
        }
    }

    async removePlayerFromFriendsList(id, playerId){
        try {
            return await Friends.updateOne(
                {user: id}, 
                {$pull :{friends: playerId}}
                )
        } catch (error) {
            logger.info(error);
        }
    }
}

module.exports = FriendsDAO