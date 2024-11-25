const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Pianos Api',
        description: 'Pianos Api'
    },
    host: 'https://cse341-pianos.onrender.com',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);