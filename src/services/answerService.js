const { answerRepository } = require("../repositories");

//Validate inputs and interacts with the repository layer
const answerService = {
  //Validates and saves a normal answer to the database
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
  //Retrieves paginates/filtered answers for a user
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
  //Fetches a specific answer by user and questio IDs
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
