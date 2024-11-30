const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Pianos Api',
        description: 'Pianos Api'
    },
    host: 'cse341-pianos.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);