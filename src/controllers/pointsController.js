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
  getUserPerformance: async (req, res) => {
    try {
      const { year, discipline } = req.query;
      const user = req.user;

      const result = await pointsService.getUserPerformance(
        user.id,
        year,
        discipline
      );

      res.status(200).json(result);
    } catch(error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
  getPerformanceBySubject: async (req, res) => {
    try {
      const { year, month } = req.query;
      const user = req.user;

      const result = await pointsService.getPerformanceBySubject(
        user.id,
        year,
        month
      );

      res.status(200).json(result);
    } catch(error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  }
};

module.exports = { pointsController };
