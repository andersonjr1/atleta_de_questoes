const { pointsService } = require("../services");

const pointsController = {
  //Retrieve points for the currenthly authenticated user
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
  //Retrieve all points entries for the authenticated user
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
