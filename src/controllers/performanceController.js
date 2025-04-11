const { performanceService } = require("../services");

//Manages requests for user performance data analytics
const performanceController = {
  //Gets performance data grouped by subject, can filter by year and month
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
  //Gets performance data grouped by month for a specific year and subject
  //Used for generatinf progress graphs
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
