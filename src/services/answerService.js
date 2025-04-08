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
  getSubjectPerformance: async (accountId, year, month) => {
    try {
      const answers = await answerRepository.getUserAnswers({ accountId });
      
      //Filter by year and month
      const filteredAnswers = answers.filter(answer => {
        const answerDate = new Date(answer.answered_at);
        const matchesYear = !year || answerDate.getFullYear() === parseInt(year);
        const matchesMonth = !month || (answerDate.getMonth() + 1) === parseInt(month);
        return matchesYear && matchesMonth;
      });
      
      //Group by subjects
      const subjects = {
        matematica: { total: 0, correct: 0 },
        linguagens: { total: 0, correct: 0 },
        cienciasNatureza: { total: 0, correct: 0 },
        cienciasHumanas: { total: 0, correct: 0 }
      };
      
      filteredAnswers.forEach(answer => {
        const discipline = answer.discipline;
        if (subjects[discipline]) {
          subjects[discipline].total++;
          
          const correctAlternative = answer.alternatives.find(a => a.is_correct);
          if (answer.selected_alternative_id === correctAlternative.id) {
            subjects[discipline].correct++;
          }
        }
      });
      
      //Percentages
      const result = {};
      for (const [key, value] of Object.entries(subjects)) {
        result[key] = {
          ...value,
          percentage: value.total > 0 ? Math.round((value.correct / value.total) * 100) : 0
        };
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { answerService };
