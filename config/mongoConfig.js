const mongoose = require('mongoose');
// const envConfig = require('./envConfig');
const logger = require('../utils/logger');

require('dotenv').config() 
    const connection = mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    mongoose.connection.once('open', () => {
        logger.info(`MongoDB conectado`)
    })
    module.exports = {connection}