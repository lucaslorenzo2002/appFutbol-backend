const express = require('express');
const session = require('cookie-session');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const{ Server: HttpServer } = require('http');

const app = express(); 
const httpServer = new HttpServer(app);

    require('dotenv').config()
    require('./config/passport')

    //MIDDLEWARES
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.use(morgan('dev'))
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


    //RUTAS
    const MatchesRouter = require('./routes/matches');
    const AuthRouter  = require('./routes/auth');
    const UsersRouter  = require('./routes/users');
    const SchedulesRouter  = require('./routes/schedules');
    const NotificationsRouter  = require('./routes/notifications');
    const FriendsRouter  = require('./routes/friends');

    const matchesRouter = new MatchesRouter();
    const authRouter = new AuthRouter();
    const usersRouter = new UsersRouter();
    const schedulesRouter = new SchedulesRouter();
    const notificationsRouter = new NotificationsRouter();
    const friendsRouter = new FriendsRouter();

    app.use('/api', matchesRouter.start())
    app.use('/api', authRouter.start())
    app.use('/api', usersRouter.start())
    app.use('/api', schedulesRouter.start())
    app.use('/api', notificationsRouter.start())
    app.use('/api', friendsRouter.start())


    //SOCKETS

module.exports = httpServer