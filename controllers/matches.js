const asyncHandler = require('express-async-handler');
const MatchesApi = require('../services/matches');
const FeedbacksApi = require('../services/feedbacks');
const SchedulesApi = require('../services/schedules');
const geoRequest = require('../utils/geoRequest');
const Match = require('../schemas/match');

class MatchesController{
    constructor(){
        this.matchesApi = new MatchesApi()
        this.feedbacksApi = new FeedbacksApi()
        this.schedulesApi = new SchedulesApi()
    }

    createMatch = asyncHandler(async(req, res) => {
        try {            
            const coordinates = await geoRequest(req.body.address);
            req.body.location = {
                type: 'Point',
                coordinates
            };
            req.body.host = req.user._id;
            
            const match = await this.matchesApi.createMatch(req.body);
            await this.feedbacksApi.createFeedback(match._id);
            await this.schedulesApi.addMatchAsHost(req.user._id, match._id)

            res.json({success: true, message: 'partido creado'}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    addRegisteredUserToMatch = asyncHandler(async(req, res) => {
        try {
            await this.matchesApi.addRegisteredUserToMatch(req.params.matchId, req.params.userId)
            res.json({success: true, message: 'jugador agregado'}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    getMatches = asyncHandler(async(req, res) => {
        try {
            req.user.location.coordinates[0] === req.body.latitude; 
            req.user.location.coordinates[1] === req.body.longitude;  
            const matches = await this.matchesApi.getNearMatches(req.user.location.coordinates, req.user.maxDistance);
            res.json({success: true, data: matches}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    sortMatchesByDate = asyncHandler(async(req, res) => {
        try {
            req.user.location.coordinates === req.body.locationCoordinates; 
            const matchesSortedByDate = await this.matchesApi.sortMatchByDate(req.user.location.coordinates, req.user.maxDistance);
            res.json({success: true, data: matchesSortedByDate}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })
    
    getMatchByCategory = asyncHandler(async(req, res) => {
        try {
            req.user.location.coordinates[0] === req.body.latitude; 
            req.user.location.coordinates[1] === req.body.longitude; 
            const matchesFilteredByCategory = await this.matchesApi.getMatchByCategory(req.user.location.coordinates, req.user.maxDistance, req.params.categoria);
            res.json({success: true, data: matchesFilteredByCategory}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    getMatchByType = asyncHandler(async(req, res) => {
        try {
            req.user.location.coordinates[0] === req.body.latitude; 
            req.user.location.coordinates[1] === req.body.longitude; 
            const matchesFilteredByType = await this.matchesApi.getMatchByMatchType(req.user.location.coordinates, req.user.maxDistance, req.params.tipo);
            res.json({success: true, data: matchesFilteredByType}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    cancelMatch = asyncHandler(async(req, res) => {
        try {
            await this.matchesApi.cancelMatch(req.params.id);
            res.json({success: true, message: 'partido cancelado'}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    }) 

    getPostponeMatch = asyncHandler(async(req, res) => {
        try {
            res.render('postponeMatch')
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    }) 

    postponeMatch = asyncHandler(async(req, res) => {
        try {
            await this.matchesApi.postponeMatch(req.params.id, req.body)

            res.json({success: true, message: 'partido postergado'}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    }) 

    deleteAllMatches = asyncHandler(async(req, res) => {
        try {
            await Match.deleteMany()

            res.json({success: true, message: 'partidos eliminados'}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    }) 
}

module.exports = MatchesController