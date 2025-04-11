const { pointsRepository } = require("../repositories");

const pointsService = {
  //Retrieve a summary of points for a specific user
  getPointsByUser: async (user) => {
    try {
      const result = await pointsRepository.getPointsByUser(user);

      return result;
    } catch (error) {
      throw error;
    }
  },
  //Retrive all points entries for a specific user
  getAllUserPoints: async (user) => {
    try {
      const result = await pointsRepository.getAllUserPoints(user);

      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { pointsService };
