const ResetPasswordToken = require("../schemas/resetPasswordToken");
const logger = require('../utils/logger');

class ResetPasswordTokenDAO{
    constructor(connection){
        this.connection = connection
    }

    async findOneTokenByToken(token){
        try {
            return await ResetPasswordToken.findOne({token}).populate('userId');
        } catch (err) {
            logger.info(err)
        }
    }

    async findOneTokenByUser(userId){
        try {
            return await ResetPasswordToken.findOne({userId});
        } catch (err) {
            logger.info(err)
        }
    }

    async deleteOneToken(){
        try {
            return await token.deleteOne();
        } catch (err) {
            logger.info(err)
        }
    }

}

module.exports = ResetPasswordTokenDAO