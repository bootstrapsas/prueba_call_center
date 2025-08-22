// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Inventario",
      version: "1.0.0",
      description: "Documentación del API REST de Inventario con usuarios, productos y compras",
    },
    servers: [
      {
        url: "http://localhost:3000", // Cambia el puerto si tu app usa otro
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // archivos a documentar
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpecs,
};
