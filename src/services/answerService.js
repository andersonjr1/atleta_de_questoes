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
  getUserPerformance: async (accountId, year, discipline) => {
    try {
      //Get all user answers
      const answers = await answerRepository.getUserAnswers({ accountId });
      
      //Filter by year
      const filteredByYear = year 
        ? answers.filter(a => new Date(a.answered_at).getFullYear() === parseInt(year))
        : answers;
      
      //Group by month and subject
      const monthlyData = {};
      
      filteredByYear.forEach(answer => {
        const date = new Date(answer.answered_at);
        const month = date.getMonth(); // 0-11
        const answerDiscipline = answer.discipline;
        
        //Filter by discipline
        if (discipline && discipline !== "" && answerDiscipline !== discipline.toLowerCase()) {
          return; 
        }
        
        if (!monthlyData[month]) {
          monthlyData[month] = { total: 0, correct: 0 };
        }
        
        monthlyData[month].total++;
        
        //Verify if answer is correct
        const correctAlternative = answer.alternatives.find(a => a.is_correct);
        if (answer.selected_alternative_id === correctAlternative.id) {
          monthlyData[month].correct++;
        }
      });
      
      //Format graph data
      const result = Array(12).fill().map((_, month) => {
        const data = monthlyData[month] || { total: 0, correct: 0 };
        return {
          month,
          total: data.total,
          correct: data.correct,
          percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
        };
      });
      
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { answerService };