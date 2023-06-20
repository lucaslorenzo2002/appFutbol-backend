const UsersDAO = require('../database/users');
const connection = require('../config/mongoConfig');
const ResetPasswordToken = require('../schemas/resetPasswordToken');
const hash = require('../utils/hashing');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

class AuthApi{
    constructor(){
        this.UsersDAO = new UsersDAO(connection)
    }

    async resetPasswordRequest(userMail){
        const user = await this.UsersDAO.getUserByMail(userMail); 

        if (!user) {
        throw new Error("User does not exist");
        }
        let token = await ResetPasswordToken.findOne({ userId: user._id });
        if (token) { 
            await token.deleteOne()
        };
        let resetToken = crypto.randomBytes(32).toString("hex");

        await new ResetPasswordToken({
            userId: user._id,
            token: hash(resetToken),
            createdAt: Date.now()
        }).save();

        let resetUrl = `${process.env.URL}/resetpassword/${resetToken}}`

        let message = `
        <h2>HOLA ${user.username}!</h2>
        <p>hace en click en la url proporcionada para cambiar tu contrasenia</p>
        <p>el link es valido por una hora</p> 
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Saludos...</p>
        `

        let from = process.env.EMAIL_USER;

        let to = user.mail;

        let subject = `<p>Reset password email</p>`;

        await sendEmail(from, to, subject, message)
    }
}

module.exports = AuthApi