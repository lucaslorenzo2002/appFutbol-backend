const ChatsControllers = require('../controllers/chats');
const authMiddleware = require('../middlewares/auth');
const chatsRouter = require('./router');

class ChatsRoutes{
    constructor(){
        this.controller = new ChatsControllers()
}

    start(){
        chatsRouter.post('/crearchat/:jugadorid', authMiddleware, this.controller.createChat)
        chatsRouter.get('/mischats', authMiddleware, this.controller.getMyChats)
        chatsRouter.get('/chat/:chatid', authMiddleware, this.controller.getChat)

        return chatsRouter
    }
}

module.exports = ChatsRoutes