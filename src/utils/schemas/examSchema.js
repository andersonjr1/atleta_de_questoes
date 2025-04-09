const examSchema = {
    Exam: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "5f8d0d55b54764421b7156c3"
            },
            limit_time: {
                type: "string",
                format: "date-time",
                description: "Data/hora limite para finalização do exame"
            },
            done_time_at: {
                type: "string",
                format: "date-time",
                nullable: true,
                description: "Data/hora em que o exame foi finalizado"
            },
            done: {
                type: "boolean",
                description: "Indica se o exame foi finalizado"
            },
            questions: {
                type: "array",
                items: {
                    $ref: '#/components/schemas/ExamQuestion'
                }
            }
        }
    },
    ExamQuestion: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid"
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
                example: "Matemática",
                enum: ["matematica", "linguagens", "ciencias-natureza", "ciencias-humanas"]
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
            answer_id: {
                type: "string",
                format: "uuid",
                nullable: true,
                description: "ID da alternativa selecionada"
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
                    type: "string",
                    example: "http://exemplo.com/arquivo.pdf"
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
    },
    ExamQuestionResponse: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid"
            },
            id_exam: {
                type: "string",
                format: "uuid"
            },
            id_question: {
                type: "string",
                format: "uuid"
            },
            id_question_alternative: {
                type: "string",
                format: "uuid"
            },
            updated_at: {
                type: "string",
                format: "date-time"
            }
        }
    }
}

module.exports = examSchema;