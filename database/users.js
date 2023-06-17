const { findByIdAndUpdate } = require("../schemas/match");
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
}

module.exports = UsersDAO