const express = require('express');
const session = require('cookie-session');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
//const swaggerJSDoc = require('swagger-jsdoc');
//const swaggerUi = require('swagger-ui-express');
//const options = require('./swaggerOptions');
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
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }))
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
        credentials: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())



    //const specs = swaggerJSDoc(options);

    //RUTAS
    const MatchesRouter = require('./routes/matches');
    const AuthRouter  = require('./routes/auth');
    const UsersRouter  = require('./routes/users');
    const SchedulesRouter  = require('./routes/schedules');

    const matchesRouter = new MatchesRouter();
    const authRouter = new AuthRouter();
    const usersRouter = new UsersRouter();
    const schedulesRouter = new SchedulesRouter();

    app.use('/api', matchesRouter.start())
    app.use('/api', authRouter.start())
    app.use('/api', usersRouter.start())
    app.use('/api', schedulesRouter.start())

    //app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))

    //SOCKETS

module.exports = httpServer