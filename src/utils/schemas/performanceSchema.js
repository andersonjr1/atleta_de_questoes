const performanceSchema = {
    SubjectPerformance: {
        type: "object",
        properties: {
            total: {
                type: "integer",
                example: 15,
                description: "Total de questões respondidas"
            },
            correct: {
                type: "integer",
                example: 10,
                description: "Questões respondidas corretamente"
            },
            percentage: {
                type: "integer",
                example: 67,
                description: "Porcentagem de acertos",
                minimum: 0,
                maximum: 100
            }
        }
    },
    MonthlyPerformance: {
        type: "object",
        properties: {
            month: {
                type: "integer",
                example: 4,
                description: "Mês (0-11)",
                minimum: 0,
                maximum: 11
            },
            total: {
                type: "integer",
                example: 20,
                description: "Total de questões respondidas"
            },
            correct: {
                type: "integer",
                example: 15,
                description: "Questões respondidas corretamente"
            },
            percentage: {
                type: "integer",
                example: 75,
                description: "Porcentagem de acertos",
                minimum: 0,
                maximum: 100
            }
        }
    }
}

module.exports = performanceSchema;