const NotificationsDAO = require('../database/notifications');
const connection = require('../config/mongoConfig');

class NotificationsApi{
    constructor(){
        this.notificationsDAO = new NotificationsDAO(connection)
    }

    async getAllUserNotifications(userId){
        return await this.notificationsDAO.getAllUserNotifications(userId)
    }

}

module.exports = NotificationsApi