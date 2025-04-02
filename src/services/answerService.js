const { answerRepository } = require("../repositories");

const answerService = {
  saveNormalAnswer: async (data) => {
    try {
      if (!data.accountId || !data.questionId || !data.alternativeId) {
        const error = new Error("Todos os campos são necessários");
        error.status = 400;
        throw error;
      }

      const answer = await answerRepository.saveNormalAnswer(data);
      return answer;
    } catch (error) {
      throw error;
    }
  },

  getUserAnswers: async (query) => {
    try {
      if (!query.accountId) {
        const error = new Error("O ID da do usuário é necessário");
        error.status = 400;
        throw error;
      }

      const answers = await answerRepository.getUserAnswers(query);
      return answers;
    } catch (error) {
      throw error;
    }
  },
  getSpecificAnswer: async (accountId, questionId) => {
    try {
      if (!accountId || !questionId) {
        const error = new Error(
          "O ID do usuário e o ID da questão são necessários"
        );
        error.status = 400;
        throw error;
      }
      const answer = await answerRepository.getSpecificAnswer(
        accountId,
        questionId
      );
      return answer;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { answerService };
