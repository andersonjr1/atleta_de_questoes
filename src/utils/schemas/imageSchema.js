const imageSchema = {
    ImageUploadResponse: {
        type: "object",
        properties: {
            success: {
                type: "integer",
                enum: [0, 1],
                description: "Indicador de sucesso (1=sucesso, 0=erro)"
            },
            path: {
                type: "string",
                description: "Caminho relativo da imagem salva"
            }
        }
    }
}

module.exports = imageSchema;