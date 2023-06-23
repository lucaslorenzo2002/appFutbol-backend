const asyncHandler = require('express-async-handler');
const passport = require('passport');
const logger = require('../utils/logger');
const ResetPasswordToken = require('../schemas/resetPasswordToken');
const AuthApi = require('../services/auth');

class AuthController{
    constructor(){
        this.authApi = new AuthApi()
    }

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
                return res.status(201).json({ message: 'usuario registrado' });
            });
            })(req, res, next);
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
                return res.status(200).json({ message: 'sesion iniciada' });
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
                return res.status(200).json({ message: 'sesion iniciada con google' });
            });
        })(req, res, next);
    });
    
    getLogout = asyncHandler(async(req, res) => {
        req.logout(err => {
            err ? res.json({err}) : res.json({msg: 'sesion cerrada'}).status(200)
        })
    }) 

    resetPasswordRequest = asyncHandler(async(req, res) => {
        await this.authApi.resetPasswordRequest(req.body.mail)
        try {
            res.status(200).json({success: true, message: 'mail enviado'})
        } catch (error) {
            res.status(500).json({success: false, message: 'mail no enviado, probar denuevo'})
        }
    }) 

    resetPassword = asyncHandler(async(req, res) => {
        await this.authApi.resetPassword(req.params.token, req.body.newPassword, req.body.confirmNewPassword)
        try {
            res.status(200).json({success: true, message: 'contrasenia actualizada'})
        } catch (error) {
            res.status(500).json({success: false, message: 'hubo un error ' + error})
        }
    }) 
}

module.exports = AuthController