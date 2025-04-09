const userSchema = {
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
    }
}

module.exports = userSchema;