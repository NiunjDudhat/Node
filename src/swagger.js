const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',            // by default: '1.0.0'
    title: 'E-Commerce',              // by default: 'REST API'
    description: ''         // by default: ''
  },
  host: 'localhost:8000',                 // by default: 'localhost:3000'
  basePath: '/',             // by default: '/'
  schemes: [],              // by default: ['http']
  consumes: ['application/json'],             // by default: ['application/json']
  produces: [],             // by default: ['application/json']
  tags: [                   // by default: empty Array
    {
      name: 'Category',             // Tag name
      description: ''       // Tag description
    },
    {
      name: 'Product',             // Tag name
      description: ''       // Tag description
    },
    {
      name: 'Auth',             // Tag name
      description: ''       // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'Authorization', // name of the header, query parameter or cookie
      description: 'Some description...'
    }
  },  // by default: empty object
  definitions: {}           // by default: empty object
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);