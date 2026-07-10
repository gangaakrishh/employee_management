import dotenv from "dotenv";
dotenv.config();

export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Employee Management API",
      version: "1.0.0",
      description: "API for Employee Management Application",
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
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
  apis: ["./src/routes/*.ts"],
};
