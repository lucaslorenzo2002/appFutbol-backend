const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger');
const SchedulesApi = require('../services/schedules');
const UsersApi = require('../services/users');
const MatchesApi = require('../services/matches');
const calculateDistance = require('../utils/calculateDistance');

class SchedulesController{
    constructor(){
        this.schedulesApi = new SchedulesApi()
        this.usersApi = new UsersApi()
        this.matchesApi = new MatchesApi()
    }

    getSchedule = asyncHandler(async(req, res) => {
        try {            
            const schedule = await this.schedulesApi.getSchedule(req.user._id);
            res.json({schedule}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    getListOfMyMatches = asyncHandler(async(req, res) => {
        try {            
            const schedule = await this.schedulesApi.getSchedule(req.user._id);
            const matchesAsHost = schedule.matchesashost;
            const matchesAsAPlayer = schedule.matchesasaplayer;
            if(req.params.listademispartidos === 'matchesAsHost'){
                res.json({matchesAsHost}).status(200)
            }else if(req.params.listademispartidos === 'matchesAsAPlayer'){
                res.json({matchesAsAPlayer}).status(200)
            } 
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    getMatchFromSchedule = asyncHandler(async(req, res) => {
        try {            
            const match = await this.schedulesApi.getMatchFromSchedule(req.user._id, req.params.listademispartidos);
            const matchData = match[req.params.listademispartidos].find((m) => m._id.toString() === req.params.partidoid);
            res.json({matchData}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    getNearUsers = asyncHandler(async(req, res) => {
        try {            
            const match = await this.matchesApi.getMatchById(req.params.partidoid);
            const users = await this.usersApi.getAllUsers();
            let nearUsers = [];
            for (let i = 0; i < users.length; i++) {
                if(users[i].maxDistance >= calculateDistance(users[i].location.coordinates[0], users[i].location.coordinates[1], match.location.coordinates[0], match.location.coordinates[1])){
                    nearUsers.push(users[i]);
                }
            }  
            res.json({nearUsers}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    sendInvitation = asyncHandler(async(req, res) => {
        await this.schedulesApi.sendInvitation(req.params.jugadorid, req.params.partidoid)
        try {        
            res.json({success: true, message: 'invitacion enviada con exito'}).status(200)    
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

}

module.exports = SchedulesController