const MatchesDAO = require('../database/matches');
const connection = require('../config/mongoConfig');

class MatchesApi{
    constructor(){
        this.MatchesDAO = new MatchesDAO(connection)
    }
    
    async createMatch(newMatch){
        return await this.MatchesDAO.createMatch(newMatch)
    }

    async getNearMatches(coordinates, maxDistance){
        return await this.MatchesDAO.getNearMatches(coordinates, maxDistance)
    }

    async getMatchByCategory(coordinates, maxDistance, category){
        return await this.MatchesDAO.getMatchByCategory(coordinates, maxDistance, category)
    }

    async sortMatchByDate(coordinates, maxDistance){
        return await this.MatchesDAO.sortMatchByDate(coordinates, maxDistance)
    }

    async getMatchByMatchType(coordinates, maxDistance, matchType){
        return await this.MatchesDAO.getMatchByMatchType(coordinates, maxDistance, matchType)
    }

    async getMatchById(id){
        return await this.MatchesDAO.getMatchById(id)
    }

    async cancelMatch(id){
        return await this.MatchesDAO.cancelMatch(id)
    }

    async postponeMatch(id, newDate){
        return await this.MatchesDAO.postponeMatch(id, newDate)
    }

}

module.exports = MatchesApi