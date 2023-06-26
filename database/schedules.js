const Schedule = require("../schemas/schedule");
const logger = require('../utils/logger');

class SchedulesDAO{
    constructor(connection){
        this.connection = connection
    }

    async createSchedule(userID){
        try {
            return await Schedule.create({user: userID})
        } catch (err) {
            logger.info(err)
        }
    }

    async addMatchAsHost(userId, matchId){
        try {
            return await Schedule.updateOne({user: userId}, {$push: {matchesashost: matchId}})
        } catch (err) {
            logger.info(err);
        }
    }

    async addMatchAsAPlayer(userId, matchId){
        try {
            return await Schedule.updateOne({user: userId}, {$push: {matchasaplayer: matchId}})
        } catch (err) {

            logger.info(err);
        }
    }
    
    async addCompletedMatches(userId, matchId){
        try {
            return await Schedule.updateOne({user: userId}, {$push: {completedmatches: matchId}})
        } catch (err) {
            logger.info(err);
        }
    }

    async getSchedule(userId){
        try {
            return await Schedule.findOne({user: userId}).populate('matchesashost').populate('matchesasaplayer').populate('completedmatches')
        } catch (err) {
            logger.info(err);
        }
    }

    async getOneMatchFromSchedule(userId, listOfMyMatches){
        try {
            return await Schedule.findOne({ user: userId }).select(listOfMyMatches).populate(listOfMyMatches).exec();
        } catch (err) {
            logger.info(err)
        }
    };
}

module.exports = SchedulesDAO