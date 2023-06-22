const Match = require("../schemas/match");

class MatchesDAO{
    constructor(connection){
        this.connection = connection
    }

    async createMatch(newMatch){
        try{
            return await Match.create(newMatch)
        }catch(err){
            console.log(err)
        }
    }

    async getMatches(){
        try{
            return await Match.find()
        }catch(err){
            console.log(err)
        }
    }

}
module.exports = MatchesDAO