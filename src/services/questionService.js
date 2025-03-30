const { questionRepository } = require("../repositories");
const { validateUUID } = require("../utils/validators/validateUUID");

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
  create: async (data) => {
    try {
      if (!data) {
        const error = new Error("Dados são necessários");
        error.status = 400;
        throw error;
      }

      if (!data.question_index) {
        const error = new Error("Index é necessário");
        error.status = 400;
        throw error;
      }

      if (!data.vestibular) {
        const error = new Error("Vestibular é necessário");
        error.status = 400;
        throw error;
      }

      if (!data.year) {
        const error = new Error("Ano é necessário");
        error.status = 400;
        throw error;
      }
      const response = await questionRepository.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getQuestions: async (query) => {
    try {
      if (query.page && query.limit) {
        return await questionRepository.getPaginatedQuestions(query);
      } else {
        return await questionRepository.getAllQuestions();
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { questionService };
