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
};

module.exports = { questionService };