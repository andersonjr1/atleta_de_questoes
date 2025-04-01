const { answerService } = require("../services");
const { authToken } = require("../middlewares/authMiddleware.js");

const answerController = {
  saveNormalAnswer: async (req, res) => {
    try {
      const { questionId, alternativeId } = req.body;
      const accountId = req.user.id;

      const answer = await answerService.saveNormalAnswer({
        accountId,
        questionId,
        alternativeId,
      });

      res.status(201).json(answer);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },

  getUserAnswers: async (req, res) => {
    try {
      const accountId = req.user.id;
      const answers = await answerService.getUserAnswers(accountId);
      res.status(200).json(answers);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },

  getSpecificAnswer: async (req, res) => {
    try {
      const accountId = req.user.id;
      const { questionId } = req.params;

      const answer = await answerService.getSpecificAnswer(
        accountId,
        questionId
      );

      if (!answer) {
        return res.status(404).json({ message: "Resposta não encontrada" });
      }

      res.status(200).json(answer);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
};

module.exports = { answerController };
