const MatchesController = require('../controllers/matches');
const matchesRouter = require('./router');

class MatchesRouter{
    constructor(){
        this.controller = new MatchesController()
    }

    start(){
        matchesRouter.post('/crearpartido', this.controller.createMatch)

        matchesRouter.get('/partidos', this.controller.getMatches)

        matchesRouter.get('/', (req,res)=>{res.send("HGOLA")})

        return matchesRouter
    }
}

module.exports = MatchesRouter