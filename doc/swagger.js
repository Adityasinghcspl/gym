import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GYM API',
      version: '1.0.0',
      description: 'A sample API for learning Swagger',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: ['./doc/api/*.js'], // Path to the API docs (JSDoc comments)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;