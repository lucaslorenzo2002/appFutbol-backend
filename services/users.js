const UsersDAO = require('../database/users');
const MatchesDAO = require('../database/matches');
const SchedulesDAO = require('../database/schedules');
const connection = require('../config/mongoConfig');
const NotificationsApi = require('./notifications');
const ChatsApi = require('./chats');
const MatchesApi = require('./matches');

class UsersApi{
    constructor(){
        this.usersDAO = new UsersDAO(connection)
        this.matchesDAO = new MatchesDAO(connection)
        this.schedulesDAO = new SchedulesDAO(connection)
        this.notificationsApi = new NotificationsApi()
        this.chatsApi = new ChatsApi()
        this.matchesApi = new MatchesApi()
    }
    
    async getAllUsers(){
        return await this.usersDAO.getAllUsers()
    }

    async getNearUsers(distance){
        return await this.usersDAO.getNearUsers(distance)
    }

    async getUserById(id){
        return await this.usersDAO.getUserById(id)
    }

    async aceptMatchInvitation(matchId, userId){
        const player = await this.getUserById(userId);
        const match = await this.matchesApi.getMatchById(matchId);
        const title = 'nuevo jugador en tu equipo';
        const message = `${player.username} ha aceptado la invitacion a tu partido`
        const to = match.host;
        await this.notificationsApi.createNotification(title, message, to)
        await this.chatsApi.addPlayerToMatchChat(matchId, userId)
        await this.matchesDAO.addRegisteredUserToMatch(matchId, userId)
        await this.schedulesDAO.addMatchAsAPlayer(userId, matchId)
    }

    async declineMatchInvitation(matchId, userId){
        const player = await this.getUserById(userId);
        const match = await this.matchesApi.getMatchById(matchId);
        const title = 'invitacion rechazada';
        const message = `${player.username} ha rechazado la invitacion a tu partido`;
        const to = match.host;

        await this.notificationsApi.createNotification(title, message, to)
    }

    async updateUserChats(userId, chatId){
        await this.usersDAO.updateUserChats(userId, chatId)
    }

    async updateUserData(userId, username, photo, maxDistance, age, gender, position, byo){
        return await this.updateUserData(userId, username, photo, maxDistance, age, gender, position, byo)
    }
}

module.exports = UsersApi