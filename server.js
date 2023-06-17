const httpServer = require("./app");
const cluster = require('cluster');
const os = require('os');
const envConfig = require("./config/envConfig");
const logger = require("./utils/logger");

const numCpus = os.cpus().length;

if(cluster.isPrimary){
    logger.info(numCpus);
    logger.info(process.pid);

    for(let i = 0; i < numCpus; i++){
        cluster.fork()
    }
    
    cluster.on('exit', worker => {
        logger.info(worker.process.pid);
        cluster.fork()
    })
}else{
    
//CONEXION AL PUERTO
const PORT = envConfig.PORT;

const server = httpServer.listen(PORT, () => {
        logger.info(`App listening on port ${PORT}, ${envConfig.NODE_ENV}`);
});

server.on('error', err => logger.info(err))
}