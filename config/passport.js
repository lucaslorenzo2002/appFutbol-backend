const passport = require('passport');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { connection } = require('./mongoConfig');
const logger = require('../utils/logger');
const hash = require('../utils/hashing');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const UsersDAO = require('../database/users');
const User = require('../schemas/user');
const usersDAO = new UsersDAO(connection);

const SchedulesDAO = require('../database/schedules');
const schedulesDAO = new SchedulesDAO(connection);

passport.use('register', new localStrategy({
    passReqToCallback: true
}, async(req, username, password, done) => {
    const {mail, gender} = req.body

    if( !username || !mail || !password ){
        logger.info('completa todos los campos');
        return done(null, false)
    }

    const usuario = await usersDAO.getUser(username)
    if(usuario){
        return done('nombre de usuario en uso')
    } 

    const userEmail = await usersDAO.getUserByMail(mail)
    if(userEmail){
        return done('el mail ya esta en uso')
    }

    if(password.length < 8){
        logger.info('la contrasenia debe tener al menos 8 caracteres');
        return done(null, false)
    }

    const nuevoUsuario = {
        username,
        mail,
        password: hash(password),
        gender
    };

    const mongooseUser = await usersDAO.createUser(nuevoUsuario);
    await schedulesDAO.createSchedule(mongooseUser._id)

    done(null, nuevoUsuario)}
))

passport.use('login', new localStrategy({ 
    passReqToCallback: true 
},  async(req, username, password, done) => {
        if(!username || !password){
            return done('por favor complete todos los campos')
        }

        const usuario = await usersDAO.getUser(username);
        
        if(!usuario){
            return done('usuario o contrasenia incorrectos')
        }
        const correctPassword = await bcrypt.compare(password, usuario.password)

        if (!usuario || !correctPassword){
            return done('usuario o contrasenia incorrectos')
        } 

        return done(null, usuario)
    }
))

//FACEBOOK STRATEGY

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'emails', 'age_range', 'gender', 'photos']
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ 'id': profile.id })
        .then(user => {
            if (user) {
                logger.info('user found');
                logger.info(user);
                return done(null, user);
            } else {
                const newUser = new User();

                newUser.id = profile.id;
                newUser.token = accessToken;
                newUser.username = profile.displayName;
                newUser.mail = profile.emails[0].value;
                newUser.age = profile.age_range;
                newUser.gender = profile.gender;
                newUser.photo = profile.photos[0].value;

                return newUser.save()
                    .then(newUser => done(null, newUser))
                    .catch(err => {
                        throw err;
                    });
            }
        })
        .catch(err => {
            return done(err);
        });
    }
));

//GOOGLE STRATEGY

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback",
    scope: ['id', 'mail', 'photos']
},
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ 'mail': profile.emails[0].value })
        .then(user => {
            process.env.AUTH_STRATEGY = 'google'
            if (user) {
                
                return done(null, user);
            } else {
                const newUser = new User();

                newUser.id = profile.id;
                newUser.token = accessToken;
                newUser.mail = profile.emails[0].value;
                newUser.foto = profile.photos[0].value;

                return newUser.save()
                    .then(newUser => done(null, newUser))
                    .catch(err => {
                        throw err;
                    });
            }
        })
        .catch(err => {
            return done(err);
        });
}));

passport.serializeUser((user, done) => {
    if(process.env.AUTH_STRATEGY === 'google'){
        return done(null, user._id)
    }
    return done(null, user.username)
})

passport.deserializeUser(async(user, done) => {
    if(process.env.AUTH_STRATEGY === 'google'){
        const usuario = await usersDAO.getUserById(user)
        return done(null, usuario)
    }
    const usuario = await usersDAO.getUser(user)
    return done(null, usuario)
})