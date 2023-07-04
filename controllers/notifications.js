const asyncHandler = require('express-async-handler');
const NotificationsApi = require('../services/notifications');

class SchedulesController{
    constructor(){
        this.notificationsApi = new NotificationsApi()
    }

    getAllUserNotifications = asyncHandler(async(req, res) => {
        try {            
            const notifications = await this.notificationsApi.getAllUserNotifications(req.user._id);
            res.json({success: true, data: notifications}).status(200)
        } catch (error) {
            res.json({message: error}).status(500)
        }
    })

}

module.exports = SchedulesController