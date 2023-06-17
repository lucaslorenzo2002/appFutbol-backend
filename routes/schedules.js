const ScheduleControllers = require('../controllers/schedules');
const authMiddleware = require('../middlewares/auth');
const scheduleRouter = require('./router');

class ScheduleRoutes{
    constructor(){
        this.controlador = new ScheduleControllers()
}

    start(){
        scheduleRouter.get('/miagenda', authMiddleware, this.controlador.getSchedule)
        scheduleRouter.get('/miagenda/:listademispartidos', authMiddleware, this.controlador.getListOfMyMatches)
        scheduleRouter.get('/miagenda/:listademispartidos/:partidoid', authMiddleware, this.controlador.getMatchFromSchedule)
        scheduleRouter.get('/miagenda/matchesAsHost/:partidoid/jugadoresdisponibles', authMiddleware, this.controlador.getNearUsers)

        return scheduleRouter
    }
}

module.exports = ScheduleRoutes