const UsersDAO = require('../database/users');
const connection = require('../config/mongoConfig');

class UsersApi{
    constructor(){
        this.usersDAO = new UsersDAO(connection)
    }
    
    async getAllUsers(){
        return await this.usersDAO.getAllUsers()
    }

    async getNearUsers(distance){
        return await this.usersDAO.getNearUsers(distance)
    }

    async getUserById(id){
        return await this.usersDAO.getUserById(id)
    }
}

module.exports = UsersApi