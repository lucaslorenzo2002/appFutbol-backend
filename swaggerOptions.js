const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "app futbol 5 api"
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ]
    },
    apis: ["./backend/routes/**/*.js"]
};

module.exports = options
