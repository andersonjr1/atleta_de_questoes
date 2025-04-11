const { answerRepository } = require("../repositories");

//Handles data processing and metric calculations for user performance
const performanceService = {
  //Calculates performance metrics by ENEM subject
  getSubjectPerformance: async (accountId, year, month) => {
    try {
      //Get all user answers from repository
      const answers = await answerRepository.getUserAnswers({ accountId });

      //Filter by year and month
      const filteredAnswers = answers.filter((answer) => {
        const answerDate = new Date(answer.answered_at);
        const matchesYear =
          !year || answerDate.getFullYear() === parseInt(year);
        const matchesMonth =
          !month || answerDate.getMonth() + 1 === parseInt(month);
        return matchesYear && matchesMonth;
      });

      //Initialize subject tracking for ENEM disciplines
      const subjects = {
        matematica: { total: 0, correct: 0 },
        linguagens: { total: 0, correct: 0 },
        "ciencias-natureza": { total: 0, correct: 0 },
        "ciencias-humanas": { total: 0, correct: 0 },
      };

      //Process each answer
      filteredAnswers.forEach((answer) => {
        const discipline = answer.discipline;
        if (subjects[discipline]) {
          subjects[discipline].total++;

          //Check if answer was correct
          const correctAlternative = answer.alternatives.find(
            (a) => a.is_correct
          );
          if (answer.selected_alternative_id === correctAlternative.id) {
            subjects[discipline].correct++;
          }
        }
      });

      //Calculate Percentages
      const result = {};
      for (const [key, value] of Object.entries(subjects)) {
        result[key] = {
          ...value,
          percentage:
            value.total > 0
              ? Math.round((value.correct / value.total) * 100)
              : 0,
        };
      }

      return result;
    } catch (error) {
      throw error;
    }
  },
  //Calculates monthly performance trends for a specific year/discipline
  getUserPerformance: async (accountId, year, discipline) => {
    try {
      //Get all user answers
      const answers = await answerRepository.getUserAnswers({ accountId });

      //Filter by year
      const filteredByYear = year
        ? answers.filter(
            (a) => new Date(a.answered_at).getFullYear() === parseInt(year)
          )
        : answers;

      //Group by month and subject
      const monthlyData = {};

      filteredByYear.forEach((answer) => {
        const date = new Date(answer.answered_at);
        const month = date.getMonth(); // 0-11
        const answerDiscipline = answer.discipline;

        //Skip if discipline filter does not match
        if (
          discipline &&
          discipline !== "" &&
          answerDiscipline !== discipline.toLowerCase()
        ) {
          return;
        }

        if (!monthlyData[month]) {
          monthlyData[month] = { total: 0, correct: 0 };
        }

        monthlyData[month].total++;

        //Verify if answer is correct
        const correctAlternative = answer.alternatives.find(
          (a) => a.is_correct
        );
        if (answer.selected_alternative_id === correctAlternative.id) {
          monthlyData[month].correct++;
        }
      });

      //Format results for all 12 months (even empty ones)
      const result = Array(12)
        .fill()
        .map((_, month) => {
          const data = monthlyData[month] || { total: 0, correct: 0 };
          return {
            month,
            total: data.total,
            correct: data.correct,
            percentage:
              data.total > 0
                ? Math.round((data.correct / data.total) * 100)
                : 0,
          };
        });

      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { performanceService };
