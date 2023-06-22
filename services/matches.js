const MatchesDAO = require('../database/matches');
const connection = require('../config/mongoConfig');

class MatchesApi{
    constructor(){
        this.MatchesDAO = new MatchesDAO(connection)
    }
    
    async createMatch(newMatch){
        return await this.MatchesDAO.createMatch(newMatch)
    }

    async getMatches(){
        return await this.MatchesDAO.getMatches()
    }

}    

module.exports = MatchesApi