const { examRepository, pointsRepository } = require("../repositories");

const examService = {
  createExam: async (user) => {
    try {
      const userPoints = await pointsRepository.getPointsByUser(user);

      const result = await examRepository.createExam(user, userPoints);

      result.questions.forEach((question) => {
        question.alternatives.forEach((alternative, index) => {
          alternative.letter = question.letters_order[index];
        });
        question.alternatives.sort((a, b) => {
          if (a.letter < b.letter) {
            return -1;
          }
        });
        delete question.letters_order;
      });

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

      result.questions.forEach((question) => {
        question.alternatives.forEach((alternative, index) => {
          alternative.letter = question.letters_order[index];
        });
        question.alternatives.sort((a, b) => {
          if (a.letter < b.letter) {
            return -1;
          }
        });
        delete question.letters_order;
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
  getAllExams: async (accountId) => {
    try {
      const result = await examRepository.getAllExams(accountId);

      result.forEach((exam) => {
        exam.questions.forEach((question) => {
          question.alternatives.forEach((alternative, index) => {
            alternative.letter = question.letters_order[index];
          });
          question.alternatives.sort((a, b) => {
            if (a.letter < b.letter) {
              return -1;
            }
          });
          delete question.letters_order;
        });
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
  getExamById: async (accountId, examId) => {
    try {
      const result = await examRepository.getExamById(accountId, examId);

      result.questions.forEach((question) => {
        question.alternatives.forEach((alternative, index) => {
          alternative.letter = question.letters_order[index];
        });
        question.alternatives.sort((a, b) => {
          if (a.letter < b.letter) {
            return -1;
          }
        });
        delete question.letters_order;
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { examService };
