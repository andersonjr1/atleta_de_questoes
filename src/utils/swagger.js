const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const components = {
  securitySchemes: {
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "SESSION_ID",
    },
  },
  schemas: {
    UserRegister: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: {
          type: "string",
          example: "João Silva",
          minLength: 3,
          maxLength: 60
        },
        email: { 
          type: "string",
          format: "email",
          example: "joao@email.com"
        },
        password: {
          type: "string",
          format: "password",
          example: "SenhaSegura123",
          minLength: 8,
          maxLength: 30
        }
      }
    },
    UserLogin: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          format: "email",
          example: "joao@email.com"
        },
        password: {
          type: "string",
          format: "password",
          example: "SenhaSegura123"
        }
      }
    },
    UserResponse: {
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
          example: "5f8d0d55b54764421b7156c3"
        },
        name: {
          type: "string",
          example: "João Silva"
        },
        email: {
          type: "string",
          example: "joao@email.com"
        },
        role: {
          type: "string",
          example: "user",
          enum: ["user", "admin"]
        }
      }
    },
    Question: {
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
          example: "5f8d0d55b54764421b7156c3"
        },
        question_index: {
          type: "string",
          example: "Q1"
        },
        vestibular: {
          type: "string",
          example: "ENEM"
        },
        year: {
          type: "integer",
          example: 2022
        },
        language: {
          type: "string",
          example: "pt-BR"
        },
        discipline: {
          type: "string",
          example: "Matemática"
        },
        sub_discipline: {
          type: "string",
          example: "Geometria"
        },
        level: {
          type: "integer",
          example: 3
        },
        context: {
          type: "string",
          example: "Texto completo da questão..."
        },
        alternative_introduction: {
          type: "string",
          example: "Texto introdutório para as alternativas"
        },
        explanation: {
          type: "string",
          example: "Explicação detalhada da resposta"
        },
        alternatives: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "uuid"
              },
              letter: {
                type: "string",
                example: "A"
              },
              alternative_text: {
                type: "string",
                example: "Texto da alternativa"
              },
              file_url: {
                type: "string",
                nullable: true,
                example: "http://exemplo.com/imagem.jpg"
              },
              is_correct: {
                type: "boolean",
                example: true
              }
            }
          }
        },
        support_file: {
          type: "array",
          items: {
            type: "string",
            example: "http://exemplo.com/arquivo.pdf"
          }
        },
        support_urls: {
          type: "array",
          items: {
            type: "string",
            example: "http://exemplo.com/recurso"
          }
        }
      }
    },
    QuestionInput: {
      type: "object",
      required: ["question_index", "vestibular", "year", "alternatives"],
      properties: {
        question_index: {
          type: "string",
          example: "Q1"
        },
        vestibular: {
          type: "string",
          example: "ENEM"
        },
        year: {
          type: "integer",
          example: 2022
        },
        language: {
          type: "string",
          example: "pt-BR"
        },
        discipline: {
          type: "string",
          example: "Matemática"
        },
        sub_discipline: {
          type: "string",
          example: "Geometria"
        },
        level: {
          type: "integer",
          example: 3
        },
        context: {
          type: "string",
          example: "Texto completo da questão..."
        },
        alternative_introduction: {
          type: "string",
          example: "Texto introdutório para as alternativas"
        },
        explanation: {
          type: "string",
          example: "Explicação detalhada da resposta"
        },
        alternatives: {
          type: "array",
          minItems: 1,
          items: {
            type: "object",
            required: ["letter", "alternative_text", "is_correct"],
            properties: {
              letter: {
                type: "string",
                example: "A"
              },
              text: {
                type: "string",
                example: "Texto da alternativa"
              },
              file_url: {
                type: "string",
                nullable: true,
                example: "http://exemplo.com/imagem.jpg"
              },
              is_correct: {
                type: "boolean",
                example: true
              }
            }
          }
        },
        question_files: {
          type: "array",
          items: {
            type: "string",
            example: "http://exemplo.com/arquivo.pdf"
          }
        },
        support_urls: {
          type: "array",
          items: {
            type: "string",
            example: "http://exemplo.com/recurso"
          }
        }
      }
    }
  }
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
        url: "http://localhost:4000/api",
        description: "Servidor Local"
      }
    ],
    components: components
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {  
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Atleta de Questões API",
    swaggerOptions: {
      docExpansion: "none"
    }
  }));
  
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = {
  swaggerDocs,
};
