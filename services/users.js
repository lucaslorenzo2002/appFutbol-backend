const UsersDAO = require('../database/users');
const MatchesDAO = require('../database/matches');
const SchedulesDAO = require('../database/schedules');
const connection = require('../config/mongoConfig');

class UsersApi{
    constructor(){
        this.usersDAO = new UsersDAO(connection)
        this.matchesDAO = new MatchesDAO(connection)
        this.schedulesDAO = new SchedulesDAO(connection)
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
        await this.matchesDAO.addRegisteredUserToMatch(matchId, userId)
        await this.schedulesDAO.addMatchAsAPlayer(userId, matchId)
    }
}

module.exports = UsersApi