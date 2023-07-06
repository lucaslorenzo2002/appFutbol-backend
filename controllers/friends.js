const asyncHandler = require('express-async-handler');
const FriendsApi = require('../services/friends');

class FriendsController{
    constructor(){
        this.friendsApi = new FriendsApi()
    }

    getFriendsList = asyncHandler(async(req, res) => {
        try {            
            const friendsList = await this.friendsApi.getFriendsList(req.user._id);
            res.json({success: true, data: friendsList}).status(200)
        } catch (error) {
            res.json({success:false, message: error}).status(500)
        }
    })    

    addPlayerToFriendsList = asyncHandler(async(req, res) => {
        try {            
            await this.friendsApi.addPlayerToFriendsList(req.user._id, req.params.jugadorid)
            res.json({success:true, message: `jugador ${req.params.jugadorid}, ha sido agragado a la lista de amigos de ${req.user._id}`}).status(200)
        } catch (error) {
            res.json({success:false, message: error}).status(500)
        }
    })

    removePlayerFromFriendsList = asyncHandler(async(req, res) => {
        try {            
            await this.friendsApi.removePlayerFromFriendsList(req.user._id, req.params.jugadorid)
            res.json({success:true, message: `jugador ${req.params.jugadorid}, ha sido eliminado de la lista de amigos de ${req.user._id}`}).status(200)
        } catch (error) {
            res.json({success:false, message: error}).status(500)
        }
    })

}

module.exports = FriendsController