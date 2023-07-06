const FriendsControllers = require('../controllers/friends');
const authMiddleware = require('../middlewares/auth');
const friendsRouter = require('./router');

class FriendsRoutes{
    constructor(){
        this.controller = new FriendsControllers()
}

    start(){
        friendsRouter.get('/milistadeamigos', authMiddleware, this.controller.getFriendsList)
        friendsRouter.post('/agregaralistadeamigos/:jugadorid', authMiddleware, this.controller.addPlayerToFriendsList)
        friendsRouter.post('/eliminardelistadeamigos/:jugadorid', authMiddleware, this.controller.removePlayerFromFriendsList)

        return friendsRouter
    }
}

module.exports = FriendsRoutes