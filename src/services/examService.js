const { examRepository } = require("../repositories");

const examService = {
  getExams: async () => {
    try {
      const result = await examRepository.getExams();
      return result;
    } catch (error) {
      throw error;
    }
  },
  getExam: async () => {
    try {
    } catch (error) {
      throw error;
    }
  },
  createExam: async (accountId) => {
    try {
      const result = await examRepository.createExam(accountId);
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateExam: async () => {
    try {
    } catch (error) {
      throw error;
    }
  },
  deleteExam: async () => {
    try {
    } catch (error) {
      throw error;
    }
  },
  getQuestions: async () => {
    try {
    } catch (error) {
      throw error;
    }
  },
  getQuestion: async () => {
    try {
    } catch (error) {
      throw error;
    }
  },
  createQuestion: async () => {
    try {
    } catch (error) {
      throw error;
    }
  },
  updateQuestion: async () => {
    try {
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async () => {
    try {
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { examService };
