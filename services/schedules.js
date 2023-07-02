const SchedulesDAO = require('../database/schedules');
const UsersDAO = require('../database/users');
const MatchesDAO = require('../database/matches');
const connection = require('../config/mongoConfig');
const sendEmail = require('../utils/sendEmail');

class SchedulesApi{
    constructor(){
        this.schedulesDAO = new SchedulesDAO(connection)
        this.usersDAO = new UsersDAO(connection)
        this.matchesDAO = new MatchesDAO(connection)
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

    async sendInvitation(userId, matchId){
        const user = await this.usersDAO.getUserById(userId);
        const match = await this.matchesDAO.getMatchById(matchId);

        let message = `
        <h2>HOLA ${user.username}!</h2>
        <p>Te han invitado a jugar un partido el proximo ${match.date}</p>
        <p>En la calle ${match.address}</p>
        <p>El organizador del evento es ${match.host.username}</p> 
        <form action="/api/aceptarinvitacionapartido/${matchId}/${userId}" method="post">
            <input type="submit" value="quiero jugar">
        </form>
        <form action="/api/rechazarinvitacionapartido" method="post">
            <input type="submit" value="me quedo en casa">
        </form>
        <p>Saludos...</p>
        `

        let from = process.env.EMAIL_USER;

        let to = user.mail;

        let subject = "Fuiste invitado a un partido";

        await sendEmail(from, to, subject, message)
    }
}

module.exports = SchedulesApi