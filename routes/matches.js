const MatchesController = require('../controllers/matches');
const matchesRouter = require('./router');
const authMiddleware = require('../middlewares/auth');

class MatchesRouter{
    constructor(){
        this.controller = new MatchesController()
    }

    start(){
        matchesRouter.post('/crearpartido', authMiddleware, this.controller.createMatch)

        matchesRouter.get('/partidos', authMiddleware, this.controller.getMatches)

        matchesRouter.get('/partidos/proximospartidos', authMiddleware, this.controller.sortMatchesByDate)

        matchesRouter.get('/partidos/categoria/:categoria', authMiddleware, this.controller.getMatchByCategory)

        matchesRouter.get('/partidos/tipo/:tipo', authMiddleware, this.controller.getMatchByType)

        matchesRouter.post('/cancelarpartido/:id', authMiddleware, this.controller.cancelMatch)

        matchesRouter.get('/postergarpartido/:id', authMiddleware, this.controller.getPostponeMatch)

        matchesRouter.post('/eliminartodoslospartidos', this.controller.deleteAllMatches)

        return matchesRouter
    }
}

module.exports = MatchesRouter