const { pointsRepository } = require("../repositories");

const pointsService = {
  getPointsByUser: async (user) => {
    try {
      const result = await pointsRepository.getPointsByUser(user);

      return result;
    } catch (error) {
      throw error;
    }
  },
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
