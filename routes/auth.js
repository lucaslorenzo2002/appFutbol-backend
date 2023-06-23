const AuthController = require('../controllers/auth');
const authRouter = require('./router');

class AuthRouter{
    constructor(){
        this.controller = new AuthController()
    }

    start(){
        authRouter.get('/', (res,req)=>{
            res.send("HOLA A TODOS")
        })

        authRouter.get('/register', this.controller.getRegistro)
        authRouter.post('/register', this.controller.postRegistro)

        authRouter.get('/login', this.controller.getLogin)
        authRouter.post('/login', this.controller.postLogin)

        authRouter.get('/auth/facebook', this.controller.getLoginFacebook)
        authRouter.get('/auth/facebook/callback', this.controller.getLoginFacebookCallback)

        authRouter.get('/auth/google', this.controller.getLoginGoogle)
        authRouter.get('/auth/google/callback', this.controller.getLoginGoogleCallback)

        authRouter.get('/logout', this.controller.getLogout)

        authRouter.post('/resetpasswordrequest', this.controller.resetPasswordRequest)
        authRouter.post('/resetpassword/:token', this.controller.resetPassword)

        return authRouter
    }
}

module.exports = AuthRouter