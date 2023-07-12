const asyncHandler = require('express-async-handler');
const ChatsApi = require('../services/chats');
const UsersApi = require('../services/users');

class ChatsController{
    constructor(){
        this.chatsApi = new ChatsApi()
        this.usersApi = new UsersApi()
    }

    createChat = asyncHandler(async(req, res) => {
        try {           
            const chat = await this.chatsApi.createChat([], [req.user._id, req.params.jugadorid])
            const users = await this.usersApi.getAllUsers();
            for (let i = 0; i < users.length; i++) {
                if( users[i]._id.toString() === req.user._id.toString() || users[i]._id.toString() === req.params.jugadorid ){
                    await this.usersApi.updateUserChats(users[i]._id, chat._id)
                } 
            }
            
            res.json({success: true, message: 'chat creado'}).status(200)
        } catch (error) {
            res.json({message: error}).status(500)
        }
    })

    getMyChats = asyncHandler(async(req, res) => {
        try {            
            const chats = await this.chatsApi.getMyChats(req.user._id)
            res.json({success: true, data: chats}).status(200)
        } catch (error) {
            res.json({message: error}).status(500)
        }
    })

    getChat = asyncHandler(async(req, res) => {
        try {            
            const chat = await this.chatsApi.getChat(req.params.chatid)
            res.json({success: true, data: chat}).status(200)
        } catch (error) {
            res.json({message: error}).status(500)
        }
    })

}

module.exports = ChatsController