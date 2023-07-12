const MessagesControllers = require('../controllers/messages');
const authMiddleware = require('../middlewares/auth');
const messagesRouter = require('./router');

class MessagesRoutes{
    constructor(){
        this.controller = new MessagesControllers()
}

    start(){
        messagesRouter.post('/crearmensaje/:chatid', authMiddleware, this.controller.createMessage)
        messagesRouter.post('/eliminarmensaje/:mensajeid', authMiddleware, this.controller.deleteMessage)

        return messagesRouter
    }
}

module.exports = MessagesRoutes