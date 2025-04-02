const { pointsService } = require("../services/pointsService");

const pointsController = {
  getPointsByUser: async (req, res) => {
    try {
      const user = req.user;
      const result = await pointsService.getPointsByUser(user);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  getAllUserPoints: async (req, res) => {
    try {
      const user = req.user;
      const result = await pointsService.getAllUserPoints(user);
      res.status(200).json(result);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
};

module.exports = { pointsController };
