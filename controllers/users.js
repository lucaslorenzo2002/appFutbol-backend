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
            res.json({users}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    getUserById = asyncHandler(async(req, res) => {
        try {            
            const user = await this.usersApi.getUserById(req.params.id);
            res.json({user}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })

    getMyProfile = asyncHandler(async(req, res) => {
        try {            
            const user = await this.usersApi.getUserById(req.user._id);
            res.json({user}).status(200)
        } catch (error) {
            res.json({error}).status(500)
        }
    })
}

module.exports = UsersController