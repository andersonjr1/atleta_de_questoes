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
      let page;
      let limit;
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const accountId = req.user.id;

      if (req.query.page && req.query.limit) {
        page = parseInt(req.query.page);
        limit = parseInt(req.query.limit);
      }

      const startIndex = (page - 1) * limit;

      let questions = await answerService.getUserAnswers({
        page,
        limit,
        startIndex,
        accountId,
        startDate,
        endDate,
      });

      const results = {};

      if (questions.length > limit) {
        questions = questions.splice(0, limit);
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      results.results = questions;
      res.status(200).json(results);
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
  getSubjectPerformance: async (req, res) => {
    try {
      const accountId = req.user.id;
      const { year, month } = req.query;

      const performanceData = await answerService.getSubjectPerformance(
        accountId,
        year,
        month
      );

      res.status(200).json(performanceData);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  getUserPerformance: async (req, res) => {
    try {
      const accountId = req.user.id;
      const { year, discipline } = req.query;

      const performanceData = await answerService.getUserPerformance(
        accountId,
        year,
        discipline
      );

      res.status(200).json(performanceData);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
};

module.exports = { answerController };
