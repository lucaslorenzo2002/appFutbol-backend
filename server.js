const httpServer = require("./app");
const cluster = require('cluster');
const os = require('os');
const envConfig = require("./config/envConfig");

const numCpus = os.cpus().length;

if(cluster.isPrimary){
    console.log(numCpus);
    console.log(process.pid);

    for(let i = 0; i < numCpus; i++){
        cluster.fork()
    }
    
    cluster.on('exit', worker => {
        console.log(worker.process.pid);
        cluster.fork()
    })
}else{
    
//CONEXION AL PUERTO
const PORT = envConfig.PORT;

const server = httpServer.listen(PORT, () => {
        console.log(`App listening on port ${PORT}, ${envConfig.NODE_ENV}`);
        res.send("HOLA")
});

server.on('error', err => console.log(err))
}