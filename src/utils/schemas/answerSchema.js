const answerSchema = {
    AnswerInput: {
        type: "object",
        required: ["questionId", "alternativeId"],
        properties: {
            questionId: {
                type: "string",
                format: "uuid",
                description: "ID da questão respondida"
            },
            alternativeId: {
                type: "string",
                format: "uuid",
                description: "ID da alternativa selecionada"
            }
        }
    },
    Answer: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "ID da resposta"
            },
            id_account: {
                type: "string",
                format: "uuid",
                description: "ID do usuário que respondeu"
            },
            id_question: {
                type: "string",
                format: "uuid",
                description: "ID da questão respondida"
            },
            id_alternative: {
                type: "string",
                format: "uuid",
                description: "ID da alternativa selecionada"
            },
            answered_at: {
                type: "string",
                format: "date-time",
                description: "Data/hora da resposta"
            }
        }
    },
    AnswerWithQuestion: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid"
            },
            selected_alternative_id: {
                type: "string",
                format: "uuid"
            },
            answer_id: {
                type: "string",
                format: "uuid"
            },
            answered_at: {
                type: "string",
                format: "date-time"
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
            alternatives: {
                type: "array",
                items: {
                    $ref: '#/components/schemas/QuestionAlternative'
                }
            },
            support_file: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            support_urls: {
                type: "array",
                items: {
                    type: "string"
                }
            }
        }
    },
    PaginatedAnswers: {
        type: "object",
        properties: {
            results: {
                type: "array",
                items: {
                    $ref: '#/components/schemas/AnswerWithQuestion'
                }
            },
            next: {
                type: "object",
                properties: {
                    page: {
                        type: "integer"
                    },
                    limit: {
                        type: "integer"
                    }
                }
            },
            previous: {
                type: "object",
                properties: {
                    page: {
                        type: "integer"
                    },
                    limit: {
                        type: "integer"
                    }
                }
            }
        }
    },
    QuestionAlternative: {
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
            file: {
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
}

module.exports = answerSchema;