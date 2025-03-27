const { questionRepository } = require("../repositories");

const questionService = {
    getById: async (id) => {
        try {
            if (!id) {
                const error = new Error("ID é necessário");
                error.status = 400;
                throw error;
            }

            const question = await questionRepository.getById(id);
            return question;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            if (!id) {
                const error = new Error("ID é necessário");
                error.status = 400;
                throw error;
            }

            const updatedQuestion = await questionRepository.update(id, data);

            if(!updatedQuestion){
                const error = new Error("Questão não encontrada");
                error.status = 404;
                throw error;
            }

            return updatedQuestion;

        } catch (error) {
            throw error;
        }
    }
};

module.exports = { questionService };