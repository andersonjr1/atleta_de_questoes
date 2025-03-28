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
    }
};

module.exports = { questionController };
