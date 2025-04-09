const pointsSchema = {
    UserPoints: {
        type: "object",
        properties: {
            points: {
                type: "integer",
                example: 250,
                description: "Pontuação total do usuário"
            },
            level: {
                type: "integer",
                example: 2,
                description: "Nível atual do usuário (1-3)",
                minimum: 1,
                maximum: 3
            },
            name: {
                type: "string",
                example: "João Silva",
                description: "Nome do usuário"
            }
        }
    },
    Leaderboard: {
        type: "object",
        properties: {
            user: {
                $ref: '#/components/schemas/UserPoints'
            },
            otherUsers: {
                type: "array",
                items: {
                    $ref: '#/components/schemas/UserPoints'
                },
                description: "Lista de outros usuários e suas pontuações"
            }
        }
    }
}

module.exports = pointsSchema;