const profileSchema = {
    Profile: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                example: "5f8d0d55b54764421b7156c3"
            },
            email: {
                type: "string",
                format: "email",
                example: "usuario@exemplo.com"
            },
            name: {
                type: "string",
                example: "João Silva"
            },
            phone: {
                type: "string",
                nullable: true,
                example: "(11) 99999-9999"
            },
            birthdate: {
                type: "string",
                format: "date",
                nullable: true,
                example: "1990-01-01"
            },
            location: {
                type: "string",
                nullable: true,
                example: "São Paulo, SP"
            },
            avatar_url: {
                type: "string",
                nullable: true,
                example: "/uploads/avatars/foto.jpg"
            },
            level: {
                type: "integer",
                example: 1
            },
            created_at: {
                type: "string",
                format: "date-time"
            },
            updated_at: {
                type: "string",
                format: "date-time"
            }
        }
    },
    ProfileUpdate: {
        type: "object",
        properties: {
            name: {
                type: "string",
                example: "Novo Nome"
            },
            phone: {
                type: "string",
                example: "(11) 99999-9999"
            },
            birthdate: {
                type: "string",
                format: "date",
                example: "1990-01-01"
            },
            location: {
                type: "string",
                example: "Nova Cidade, UF"
            }
        }
    }
}

module.exports = profileSchema