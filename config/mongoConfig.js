const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const envConfig = require('./envConfig');
const logger = require('../utils/logger');

require('dotenv').config() 

/* mongoose.Promise = Promise

    const getUri = async () => {
        const mongoServer = await MongoMemoryServer.create();
        if (envConfig.NODE_ENV === 'test'){
            return mongoServer.getUri()
        }
        return process.env.MONGO_URI
    }

    const connection = async({uri}) => {
        mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        mongoose.connection.once('open', () => {
            logger.info(`MongoDB conectado a ${uri}`)
        })
    }

    const closeDb = async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.disconnect()
        if (process.env.NODE_ENV === 'test') {
            await mongoServer.stop()
        }
    } */
    const connection = mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    mongoose.connection.once('open', () => {
        logger.info(`MongoDB conectado`)
    })
    module.exports = {connection}