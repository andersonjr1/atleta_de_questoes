const { answerRepository } = require("../repositories");

const answerService = {
  saveAnswer: async (data) => {
    try {
      if (!data.accountId || !data.questionId || !data.alternativeId) {
        const error = new Error("Todos os campos são necessários");
        error.status = 400;
        throw error;
      }

      if (typeof data.isExam !== "boolean") {
        data.isExam = false;
      }

      const answer = await answerRepository.saveAnswer(data);
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

  getLeaderboard: async () => {
    return await answerRepository.getLeaderboard();
  } 
};

module.exports = { answerService };
