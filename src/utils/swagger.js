const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { IP, PORT, ENV } = require("../config/env.js");
const userSchema = require("./schemas/userSchema.js");
const questionSchema = require("./schemas/questionSchema.js");
const profileSchema = require("./schemas/profileSchema.js");
const pointsSchema = require("./schemas/pointsSchema.js");
const performanceSchema = require("./schemas/performanceSchema.js");
const imageSchema = require("./schemas/imageSchema.js");
const examSchema = require("./schemas/examSchema.js");
const answerSchema = require("./schemas/answerSchema.js");

const components = {
  schemas: {
    ...userSchema,
    ...questionSchema,
    ...profileSchema,
    ...pointsSchema,
    ...performanceSchema,
    ...imageSchema,
    ...examSchema,
    ...answerSchema,
  },
};

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Atleta de Questões API",
      version: "1.0.0",
    },
    servers: [
      {
        url: ENV === "DEV" ? `${IP}:${PORT}/api` : `${IP}/api`,
        description: ENV === "DEV" ? "Servidor Local" : "Servidor Produção",
      },
    ],
    components: components,
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: "Atleta de Questões API",
      swaggerOptions: {
        docExpansion: "none",
      },
    })
  );

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = {
  swaggerDocs,
};
