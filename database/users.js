const User = require("../schemas/user");
const logger = require('../utils/logger');

class UsersDAO{
    constructor(connection){
        this.connection = connection
    }

    async createUser(newUser){
        try{
            return await User.create(newUser)
        }catch(err){
            logger.info(err)
        }
    }

    async getUser(username){
        try{
            return await User.findOne({username}).populate('schedule').lean()
        }catch(err){
            logger.info(err);
        }
    }

    async getUserLocation(){
        try {
            return await User.findOne().where().within()
        } catch (err) {
            logger.info(err);
        }
    }

    async updateUserLocation(userId, coordinates){
        try {
            return await User.findByIdAndUpdate(userId, {location:{ type: 'Point', coordinates}})
        } catch (err) {
            logger.info(err);
        }
    }

    async getUserByMail(mail){
        try{
            return await User.findOne({mail})
        }catch(err){
            logger.info(err);
        }
    }

    async getUserById(id){
        try{
            return await User.findById(id).populate('schedule').lean()
        }catch(err){
            logger.info(err);
        }
    }

    async getAllUsers(){
        try{
            return await User.find()
        }catch(err){
            logger.info(err);
        }
    }

    async getNearUsers(distance){
        try{
            return await User.find({maxDistance:{ $gte: distance}})
        }catch(err){
            logger.info(err);
        }
    }

    async updateUserChats(userId, chatId){
        try{
            return await User.findByIdAndUpdate(userId, {$push :{chats: chatId}})
        }catch(err){
            logger.info(err);
        }
    }

    async updateUserPassword(userId, newPassword){
        try{
            return await User.findByIdAndUpdate(userId, {password: newPassword})
        }catch(err){
            logger.info(err);
        }
    }

    async updateUserData(userId, username, photo, maxDistance, age, gender, position, byo){
        try{
            return await User.findByIdAndUpdate(userId, {username, photo, maxDistance, age, gender, position, byo})
        }catch(err){
            logger.info(err);
        }
    }
}

module.exports = UsersDAO