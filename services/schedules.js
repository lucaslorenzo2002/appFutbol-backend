const SchedulesDAO = require('../database/schedules');
const NotificationsDAO = require('../database/notifications');
const connection = require('../config/mongoConfig');

class SchedulesApi{
    constructor(){
        this.schedulesDAO = new SchedulesDAO(connection)
        this.notificationsDAO = new NotificationsDAO(connection)
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

    async sendInvitation(hostUser, playerUserId){

        const title = 'fuiste invitado a un partido';
        const message = `${hostUser} te ha invitado a ser parte de un partido epico, te lo vas a perder?`;
        const to = playerUserId;

        return await this.notificationsDAO.createNotification(title, message, to)
    }
}

module.exports = SchedulesApi