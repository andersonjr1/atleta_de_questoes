const questionSchema = {
  Question: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
        example: "5f8d0d55b54764421b7156c3",
      },
      question_index: {
        type: "string",
        example: "2",
      },
      vestibular: {
        type: "string",
        example: "ENEM",
      },
      year: {
        type: "integer",
        example: 2022,
      },
      language: {
        type: "string",
        example: "pt-BR",
      },
      discipline: {
        type: "string",
        example: "Matemática",
      },
      sub_discipline: {
        type: "string",
        example: "Geometria",
      },
      level: {
        type: "integer",
        example: 3,
      },
      context: {
        type: "string",
        example: "Texto completo da questão...",
      },
      alternative_introduction: {
        type: "string",
        example: "Texto introdutório para as alternativas",
      },
      explanation: {
        type: "string",
        example: "Explicação detalhada da resposta",
      },
      alternatives: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            letter: {
              type: "string",
              example: "A",
            },
            alternative_text: {
              type: "string",
              example: "Texto da alternativa",
            },
            file_url: {
              type: "string",
              nullable: true,
              example: "http://exemplo.com/imagem.jpg",
            },
            is_correct: {
              type: "boolean",
              example: true,
            },
          },
        },
      },
      support_file: {
        type: "array",
        items: {
          type: "string",
          example: "http://exemplo.com/arquivo.pdf",
        },
      },
      support_urls: {
        type: "array",
        items: {
          type: "string",
          example: "http://exemplo.com/recurso",
        },
      },
    },
  },
  QuestionInput: {
    type: "object",
    required: ["question_index", "vestibular", "year", "alternatives"],
    properties: {
      question_index: {
        type: "string",
        example: "1",
      },
      vestibular: {
        type: "string",
        example: "ENEM",
      },
      year: {
        type: "integer",
        example: 2022,
      },
      language: {
        type: "string",
        example: "pt-BR",
      },
      discipline: {
        type: "string",
        example: "Matemática",
      },
      sub_discipline: {
        type: "string",
        example: "Geometria",
      },
      level: {
        type: "integer",
        example: 3,
      },
      context: {
        type: "string",
        example: "Texto completo da questão...",
      },
      alternative_introduction: {
        type: "string",
        example: "Texto introdutório para as alternativas",
      },
      explanation: {
        type: "string",
        example: "Explicação detalhada da resposta",
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
              example: "A",
            },
            text: {
              type: "string",
              example: "Texto da alternativa",
            },
            file_url: {
              type: "string",
              nullable: true,
              example: "http://exemplo.com/imagem.jpg",
            },
            is_correct: {
              type: "boolean",
              example: true,
            },
          },
        },
      },
      question_files: {
        type: "array",
        items: {
          type: "string",
          example: "http://exemplo.com/arquivo.pdf",
        },
      },
      support_urls: {
        type: "array",
        items: {
          type: "string",
          example: "http://exemplo.com/recurso",
        },
      },
    },
  },
};

module.exports = questionSchema;
