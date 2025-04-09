const { performanceService } = require("../services");

const performanceController = {
  getSubjectPerformance: async (req, res) => {
    try {
      const accountId = req.user.id;
      const { year, month } = req.query;

      const performanceData = await performanceService.getSubjectPerformance(
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

      const performanceData = await performanceService.getUserPerformance(
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

module.exports = { performanceController };
