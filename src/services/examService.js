const { examRepository, pointsRepository } = require("../repositories");

//Handles exam creation, response processing, and data formatting
const examService = {
  createExam: async (user) => {
    //Creates a new exam with randomized questions from disciplines
    try {
      //Get user's current level for question difficulty
      const userPoints = await pointsRepository.getPointsByUser(user);

      //Create exam with 30-minute time limit
      const result = await examRepository.createExam(user, userPoints);

      //Format alternatives with randomized letter order
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
  //Save a user's answer to an exam question
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
  //Completes an exam and saves all responses
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
  //Retrieves all user exams
  getAllExams: async (accountId) => {
    try {
      const result = await examRepository.getAllExams(accountId);
      const notDoneExams = [];
      //Format alternatives with randomized letter order
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
        if (!exam.done) {
          notDoneExams.push(exam);
        }
      });

      if (notDoneExams.length > 0) {
        return notDoneExams;
      }

      return result;
    } catch (error) {
      throw error;
    }
  },
  //Retrieves a specific exam with detailed question data
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
