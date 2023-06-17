const SchedulesDAO = require('../database/schedules');
const connection = require('../config/mongoConfig');

class SchedulesApi{
    constructor(){
        this.schedulesDAO = new SchedulesDAO(connection)
    }

    async createFeedback(userId){
        return await this.schedulesDAO.createSchedule(userId)
    }

    async addMatchAsHost(userId, matchId){
        return await this.schedulesDAO.addMatchAsHost(userId, matchId)
    }

    async addMatchAsAPlayer(userId, matchId){
        return await this.schedulesDAO.addMatchAsAPlayer(userId, matchId)
    }

    async getSchedule(userId){
        return await this.schedulesDAO.getSchedule(userId)
    }

    async getMatchFromSchedule(userId, listOfMyMatches){
        return await this.schedulesDAO.getOneMatchFromSchedule(userId, listOfMyMatches)
    }
}

module.exports = SchedulesApi