const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger');
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
            console.log(req.body)
            
            const match = await this.matchesApi.createMatch(req.body);
            await this.feedbacksApi.createFeedback(match._id);
            await this.schedulesApi.addMatchAsHost(req.user._id, match._id)

            res.json({msg: 'partido creado'}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    addRegisteredUserToMatch = asyncHandler(async(req, res) => {
        try {
            await this.matchesApi.addRegisteredUserToMatch(req.params.matchId, req.params.userId)
            res.json({msg: 'jugador agregado'}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    getMatches = asyncHandler(async(req, res) => {
        try {
            const matches = await this.matchesApi.getNearMatches(req.user.location.coordinates, 10000);
            res.json({matches}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    sortMatchesByDate = asyncHandler(async(req, res) => {
        try {
            const matchesSortedByDate = await this.matchesApi.sortMatchByDate(req.user.location.coordinates, 10000);

            res.json({matchesSortedByDate}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })
    
    getMatchByCategory = asyncHandler(async(req, res) => {
        try {
            const matchesFilteredByCategory = await this.matchesApi.getMatchByCategory(req.user.location.coordinates, 10000, req.params.categoria);

            res.json({matchesFilteredByCategory}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    getMatchByType = asyncHandler(async(req, res) => {
        try {
            const matchesFilteredByType = await this.matchesApi.getMatchByMatchType(req.user.location.coordinates, 10000, req.params.tipo);

            res.json({matchesFilteredByType}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    cancelMatch = asyncHandler(async(req, res) => {
        try {
            await this.matchesApi.cancelMatch(req.params.id);

            res.json({msg: 'partido cancelado'}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    }) 

    getPostponeMatch = asyncHandler(async(req, res) => {
        try {
            res.render('postponeMatch')
        } catch (error) {
            res.json({error}).status(500)
        }
    }) 

    postponeMatch = asyncHandler(async(req, res) => {
        try {
            await this.matchesApi.postponeMatch(req.params.id, req.body)

            res.json({msg: 'partido postergado'}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    }) 

    deleteAllMatches = asyncHandler(async(req, res) => {
        try {
            await Match.deleteMany()

            res.json({msg: 'partidos eliminados'}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    }) 
}

module.exports = MatchesController