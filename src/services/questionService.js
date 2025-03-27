const { questionRepository } = require("../repositories");
const {validateUUID} = require("../utils/validators/validateUUID");

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
    delete: async (id) => {
        try {
            if (!id || !validateUUID(id)) {
                const error = new Error("UUID é necessário");
                error.status = 400;
                throw error;
            }

            const response = await questionRepository.delete(id);
            return response;
        } catch (error) {
            throw error;
        }
    },
    search: async (filters) => {
        try {
            const question = await questionRepository.search(filters);
            return question;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = { questionService };
