const { examService } = require("../services");

const examController = {
  getExams: async (req, res) => {
    try {
      const accountId = req.user.id;
      const exams = await examService.getExams(accountId);
      res.status(200).json(exams);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  getExam: async (req, res) => {
    try {
      const { id } = req.params;
      const accountId = req.user.id;
      const exam = await examService.getExam(id, accountId);
      res.status(200).json(exam);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  createExam: async (req, res) => {
    try {
      const accountId = req.user.id;
      const newExam = await examService.createExam(accountId);
      res.status(201).json(newExam);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  updateExam: async (req, res) => {
    try {
      const { id } = req.params;
      const accountId = req.user.id;
      const examData = req.body;
      const updatedExam = await examService.updateExam(id, examData, accountId);
      res.status(200).json(updatedExam);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  deleteExam: async (req, res) => {
    try {
      const { id } = req.params;
      const accountId = req.user.id;
      await examService.deleteExam(id, accountId);
      res.status(204).send();
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  getQuestions: async (req, res) => {
    try {
      const { examId } = req.params;
      const accountId = req.user.id;
      const questions = await examService.getQuestions(examId, accountId);
      res.status(200).json(questions);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  getQuestion: async (req, res) => {
    try {
      const { examId, questionId } = req.params;
      const accountId = req.user.id;
      const question = await examService.getQuestion(
        examId,
        questionId,
        accountId
      );
      res.status(200).json(question);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  updateQuestion: async (req, res) => {
    try {
      const { examId, questionId } = req.params;
      const accountId = req.user.id;
      const questionData = req.body;
      const updatedQuestion = await examService.updateQuestion(
        examId,
        questionId,
        questionData,
        accountId
      );
      res.status(200).json(updatedQuestion);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  deleteQuestion: async (req, res) => {
    try {
      const { examId, questionId } = req.params;
      const accountId = req.user.id;
      await examService.deleteQuestion(examId, questionId, accountId);
      res.status(204).send();
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
};

module.exports = { examController };
