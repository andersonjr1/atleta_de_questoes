const { examRepository, pointsRepository } = require("../repositories");

const examService = {
  createExam: async (user) => {
    try {
      const userPoints = await pointsRepository.getPointsByUser(user);
      const result = await examRepository.createExam(user, userPoints);
      return result;
    } catch (error) {
      throw error;
    }
  },
  saveExamQuestionResponse: async (
    examId,
    questionId,
    accountId,
    alternativeId
  ) => {
    try {
      const result = await examRepository.saveExamQuestionResponse(
        examId,
        questionId,
        accountId,
        alternativeId
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  respondExam: async (examId, accountId) => {
    try {
      const result = await examRepository.respondExam(examId, accountId);

      return result;
    } catch (error) {
      throw error;
    }
  },
  getAllExams: async (accountId) => {
    try {
      const result = await examRepository.getAllExams(accountId);

      return result;
    } catch (error) {
      throw error;
    }
  },
  getExamById: async (accountId, examId) => {
    try {
      const result = await examRepository.getExamById(accountId, examId);

      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { examService };
