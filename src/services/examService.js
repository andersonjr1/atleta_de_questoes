const { examRepository } = require("../repositories");

const examService = {
  createExam: async (accountId) => {
    try {
      const result = await examRepository.createExam(accountId);
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
};

module.exports = { examService };
