const express = require('express');
const session = require('cookie-session');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./swaggerOptions');
const{ Server: HttpServer } = require('http');

const app = express(); 
const httpServer = new HttpServer(app);

    require('dotenv').config()
    require('./config/passport')

    //HANDLEBARS
    const exphbs = require('express-handlebars');
    app.engine('handlebars', exphbs.engine())
    app.set('view engine', 'handlebars')

    //MIDDLEWARES
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(cors())
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    const specs = swaggerJSDoc(options);

    //RUTAS
    const AuthRouter  = require('./routes/auth');
    const MatchesRouter = require('./routes/matches');
    const SchedulesRouter = require('./routes/schedules');
    const UsersRouter = require('./routes/users');

    const authRouter = new AuthRouter();
    const matchesRouter = new MatchesRouter();
    const schedulesRouter = new SchedulesRouter();
    const usersRouter = new UsersRouter();

    app.use('/api', authRouter.start())
    app.use('/api', matchesRouter.start())
    app.use('/api', schedulesRouter.start())
    app.use('/api', usersRouter.start())

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

    //SOCKETS

module.exports = httpServer