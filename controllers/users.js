const asyncHandler = require('express-async-handler');
const UsersApi = require('../services/users');
const NotificationsApi = require('../services/notifications');
const MatchesApi = require('../services/matches');

class UsersController{
    constructor(){
        this.usersApi = new UsersApi()
        this.notificationsApi = new NotificationsApi()
        this.matchesApi = new MatchesApi()
    }

    getAllUsers = asyncHandler(async(req, res) => {
        try {            
            const users = await this.usersApi.getAllUsers();
            res.json({success: true, data: users}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    getUserById = asyncHandler(async(req, res) => {
        try {            
            const user = await this.usersApi.getUserById(req.params.id);
            res.json({success: true, data: user}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    getMyProfile = asyncHandler(async(req, res) => {
        try {            
            const user = await this.usersApi.getUserById(req.user._id);
            res.json({success: true, data: user}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    updateUserData = asyncHandler(async(req, res) => {
        const{username, photo, maxDistance, age, gender, position, byo} = req.body;
        try {            
            const user = await this.usersApi.updateUserData(req.user._id, username, photo, maxDistance, age, gender, position, byo);
            res.json({success: true, data: user}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    aceptMatchInvitation = asyncHandler(async(req, res) => {
        const jugador = await this.usersApi.getUserById(req.params.jugadorid);
        const partido = await this.matchesApi.getMatchById(req.params.partidoid);
        const title = 'nuevo jugador en tu equipo';
        const message = `${jugador.username} ha aceptado la invitacion a tu partido`
        const to = partido.host
        try {            
            await this.usersApi.aceptMatchInvitation(req.params.partidoid, req.params.jugadorid)
            await this.notificationsApi.createNotification(title, message, to)
            res.json({success: true, message: `user: ${req.params.jugadorid} succesfully join match: ${req.params.partidoid}`}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    declineMatchInvitation = asyncHandler(async(req, res) => {
        const jugador = await this.usersApi.getUserById(req.params.jugadorid);
        const partido = await this.matchesApi.getMatchById(req.params.partidoid);
        const title = 'invitacion rechazada';
        const message = `${jugador.username} ha rechazado la invitacion a tu partido`
        const to = partido.host
        try {
            await this.notificationsApi.createNotification(title, message, to)            
            res.json({success: true, message: "user succesfully decline invitation to match"}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })
}

module.exports = UsersController