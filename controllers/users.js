const asyncHandler = require('express-async-handler');
const logger = require('../utils/logger');
const UsersApi = require('../services/users');

class UsersController{
    constructor(){
        this.usersApi = new UsersApi()
    }

    getAllUsers = asyncHandler(async(req, res) => {
        try {            
            const users = await this.usersApi.getAllUsers();
            res.json({success: true, data: users}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    getUserById = asyncHandler(async(req, res) => {
        try {            
            const user = await this.usersApi.getUserById(req.params.id);
            res.json({success: true, data: user}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    getMyProfile = asyncHandler(async(req, res) => {
        try {            
            const user = await this.usersApi.getUserById(req.user._id);
            res.json({success: true, data: user}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    updateUserData = asyncHandler(async(req, res) => {
        const{username, photo, maxDistance, age, gender, position, byo} = req.body;
        try {            
            const user = await this.usersApi.updateUserData(req.user._id, username, photo, maxDistance, age, gender, position, byo);
            res.json({success: true, data: user}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    aceptMatchInvitation = asyncHandler(async(req, res) => {
        await this.usersApi.aceptMatchInvitation(req.params.partidoid, req.params.jugadorid)
        try {            
            res.json({success: true, message: `user: ${req.params.jugadorid} succesfully join match: ${req.params.partidoid}`}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })

    declineMatchInvitation = asyncHandler(async(req, res) => {
        try {            
            res.json({success: true, message: "user succesfully decline invitation to match"}).status(200)
        } catch (error) {
            res.json({success: false, message: error}).status(500)
        }
    })
}

module.exports = UsersController