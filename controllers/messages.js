const asyncHandler = require('express-async-handler');
const MessagesApi = require('../services/messages');

class MessagesController{
    constructor(){
        this.messagesApi = new MessagesApi()
    }

    createMessage = asyncHandler(async(req, res) => {
        try {    
            await this.messagesApi.createMessage(req.user._id, req.body.message, req.params.chatid);
            res.json({success: true, message: 'mensaje creado'}).status(200)
        } catch (error) {
            res.json({message: error}).status(500)
        }
    })

    deleteMessage = asyncHandler(async(req, res) => {
        try {            
            await this.messagesApi.deleteMessage(req.params.mensajeid)
            res.json({success: true, message: 'mensaje eliminado'}).status(200)
        } catch (error) {
            res.json({message: error}).status(500)
        }
    })

}

module.exports = MessagesController