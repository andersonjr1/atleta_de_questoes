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
  //Search questions
  search: async (req, res) => {
    try {
      let page;
      let limit;
      const filters = req.query;

      if (req.query.page && req.query.limit) {
        page = parseInt(req.query.page);
        limit = parseInt(req.query.limit);
      }

      const startIndex = (page - 1) * limit;

      filters.startIndex = startIndex;

      let questions = await questionService.search(filters);

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
  //Create a new question
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
  update: async (req, res) => {
    try {
      const { id } = req.params;
      await questionService.update(id, req.body);
      res.status(200).json({ message: "Questão atualizada com sucesso" });
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
};

module.exports = { questionController };
