const UsersControllers = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const usersRouter = require('./router');

class UsersRoutes{
    constructor(){
        this.controller = new UsersControllers()
}

    start(){
        usersRouter.get('/jugadores', authMiddleware, this.controller.getAllUsers)
        usersRouter.get('/jugadores/:id', authMiddleware, this.controller.getUserById)
        usersRouter.get('/miperfil', authMiddleware, this.controller.getMyProfile)

        return usersRouter
    }
}

module.exports = UsersRoutes