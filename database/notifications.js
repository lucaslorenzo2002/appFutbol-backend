const Notification = require("../schemas/notification");
const logger = require('../utils/logger');

class NotificationsDAO{
    constructor(connection){
        this.connection = connection
    }

    async createNotification(title, message, to){
            try{
                return await Notification.create({title, message, to})
            }catch(err){
                logger.info(err)
            }
    }

    async getAllUserNotifications(userId){
            try{
                return await Notification.find({to: userId})
            }catch(err){
                logger.info(err)
            }
    }

}

module.exports = NotificationsDAO