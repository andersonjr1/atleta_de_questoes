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
};

module.exports = { questionController };
