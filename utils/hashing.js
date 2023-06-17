const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

module.exports = hashPassword