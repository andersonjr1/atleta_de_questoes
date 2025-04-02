const { questionService } = require("../services");

const questionController = {
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const question = await questionService.getById(id);
      res.status(200).json(question);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const response = await questionService.delete(id);

      res.status(200).json(response);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  search: async (req, res) => {
    try {
      const filters = req.query;
      const questions = await questionService.search(filters);

      res.status(200).json(questions);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const question = req.body;

      const response = await questionService.create(question);

      res.status(200).json(response);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  getQuestions: async (req, res) => {
    try {
      let page;
      let limit;
      if (req.query.page && req.query.limit) {
        page = parseInt(req.query.page);
        limit = parseInt(req.query.limit);
      }

      const startIndex = (page - 1) * limit;
      let questions = await questionService.getQuestions({ page, limit });

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
};

module.exports = { questionController };
