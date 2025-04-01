const { answerService } = require("../services");
const { authToken } = require("../middlewares/authMiddleware.js");

const answerController = {
  saveAnswer: async (req, res) => {
    try {
      const { questionId, alternativeId, isExam } = req.body;
      const accountId = req.user.id;

      const answer = await answerService.saveAnswer({
        accountId,
        questionId,
        alternativeId,
        isExam: isExam || false,
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

  getLeaderboard: async (req, res) => {
    try {
      const leaderboard = await answerService.getLeaderboard();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Failed to load leaderboard" });
    }
  }
};

module.exports = { answerController };
