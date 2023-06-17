const asyncHandler = require('express-async-handler');
const passport = require('passport');
const logger = require('../utils/logger');
const ResetPasswordToken = require('../schemas/resetPasswordToken');

class AuthController{
    constructor(){

    }

    getRegistro = asyncHandler(async(req, res) => {
        try {
            res.render('register')
        } catch (error) {
            logger.info(error)
        }
    })

    postRegistro = asyncHandler(async(req, res, next) => {
        passport.authenticate('register', function(err, user, info) {
            if (err) { 
                return next(err) 
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }
            req.login(user, (error) => {
                if (error) {
                    return next(error);
                }
                return res.status(201).json({ user });
            });
            })(req, res, next);
    })  

    getLogin = asyncHandler(async(req, res) => {
        try {
            res.render('login')
        } catch (error) {
            logger.info(error)
        }
    })

    postLogin = asyncHandler(async (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: info.message });
            }
            req.login(user, (error) => {
                if (error) {
                    return next(error);
                }
                return res.status(200).json({ user });
            });
        })(req, res, next);
    });

    getLoginFacebook = passport.authenticate('facebook', {scope: 'email'})

    getLoginFacebookCallback = passport.authenticate('facebook', { failureRedirect: '/api/login', successRedirect:'/api/home'})

    getLoginGoogle = asyncHandler(async (req, res, next) => {
        passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
    });

    getLoginGoogleCallback = asyncHandler(async (req, res, next) => {
        passport.authenticate('google', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ message: info.message });
            }
            req.login(user, (error) => {
                if (error) {
                    return next(error);
                }
                return res.status(200).json({ user });
            });
        })(req, res, next);
    });
    
    getLogout = asyncHandler(async(req, res) => {
        req.logout(err => {
            err ? res.json({err}) : res.json({msg: 'sesion cerrada'}).status(200)
        })
    }) 

    resetPasswordRequest = asyncHandler(async(req, res) => {
        const user = await this.UsersDAO.getUserByMail(req.body); //tiene que haber un input con el mail del usuario

        if (!user) {
        throw new Error("User does not exist");
        }
        let token = await ResetPasswordToken.findOne({ userId: user._id });
        if (token) { 
            await token.deleteOne()
        };
        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, 10);

        await new ResetPasswordToken({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save();
    }) 

    resetPassword = asyncHandler(async(req, res) => {
        
    }) 
}

module.exports = AuthController