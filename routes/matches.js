const MatchesController = require('../controllers/matches');
const authMiddleware = require('../middlewares/auth');
const matchesRouter = require('./router');

class MatchesRouter{
    constructor(){
        this.controller = new MatchesController()
    }

    start(){
        matchesRouter.post('/crearpartido',authMiddleware, this.controller.createMatch)

        matchesRouter.get('/partidos',authMiddleware, this.controller.getMatches)

        return matchesRouter
    }
}

module.exports = MatchesRouter