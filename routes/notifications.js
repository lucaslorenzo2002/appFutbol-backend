const NotificationsControllers = require('../controllers/notifications');
const authMiddleware = require('../middlewares/auth');
const notificationsRouter = require('./router');

class NotificationsRoutes{
    constructor(){
        this.controller = new NotificationsControllers()
}

    start(){
        notificationsRouter.get('/misnotificaciones', authMiddleware, this.controller.getAllUserNotifications)

        return notificationsRouter
    }
}

module.exports = NotificationsRoutes