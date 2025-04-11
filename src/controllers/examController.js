const { examService } = require("../services");

//Manages exam creation, responss, and retrieval
const examController = {
  //Creates a new exam for the authenticated user
  createExam: async (req, res) => {
    try {
      const user = req.user;
      const newExam = await examService.createExam(user);
      res.status(201).json(newExam);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  //Saves a user's response to a specific exam question
  saveExamQuestionResponse: async (req, res) => {
    try {
      const { examId, questionId } = req.params;
      const alternativeId = req.body.id_alternative;
      const accountId = req.user.id;
      const result = await examService.saveExamQuestionResponse(
        examId,
        questionId,
        accountId,
        alternativeId
      );
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  //Marks an exam as completed and processes all answers
  respondExam: async (req, res) => {
    try {
      const { examId } = req.params;
      const accountId = req.user.id;
      const result = await examService.respondExam(examId, accountId);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  //Retrieves all exams for the authenticated user
  getAllExams: async (req, res) => {
    try {
      const accountId = req.user.id;
      const result = await examService.getAllExams(accountId);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  //Gets detailed information about a specific exam
  getExamById: async (req, res) => {
    try {
      const accountId = req.user.id;
      const examId = req.params.examId;
      const result = await examService.getExamById(accountId, examId);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
};

module.exports = { examController };
