const asyncHandler = require('express-async-handler');
const MatchesApi = require('../services/matches');

class MatchesController{
    constructor(){
        this.matchesApi = new MatchesApi()
    }

    createMatch = asyncHandler(async(req, res) => {
        try {           
            const coordinates = await geoRequest(req.body.address);
            req.body.location = {
                type: 'Point',
                coordinates
            }; 
            
            await this.matchesApi.createMatch(req.body);

            res.json({success: true, message: 'partido creado'}).status(200)
        } catch (error) {
            res.json({success: false, error}).status(500)
        }
    })

    getMatches = asyncHandler(async(req, res) => {
        try {
            const matches = await this.matchesApi.getMatches()
            res.json({matches}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })
}

module.exports = MatchesController