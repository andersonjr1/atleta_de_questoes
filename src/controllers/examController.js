const { examService } = require("../services");

const examController = {
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
};

module.exports = { examController };
