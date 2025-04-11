const { profileRepository } = require("../repositories");
const { validatePhone } = require("../utils/validators/validatePhone");
const { validateDate } = require("../utils/validators/validateDate");

//Contains business logic for profile-related operations
const profileService = {
  //Get user profile
  getProfile: async (userId) => {
    try {
      if (!userId) {
        const error = new Error("ID é necessário");
        error.status = 400;
        throw error;
      }
      //Fetches profile from repository
      const user = await profileRepository.getProfile(userId);
      if (!user) {
        const error = new Error("Usuário não encontrado");
        error.status = 404;
        throw error;
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  //Update user profile information
  updateProfile: async (userId, data) => {
    try {
      if (!userId) {
        const error = new Error("ID é necessário");
        error.status = 400;
        throw error;
      }

      //Check if user exists
      const user = await profileRepository.getProfile(userId);
      if (!user) throw { status: 404, message: "Usuário não encontrado" };

      const cleanData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );

      //Merge with existing data
      const updateData = {
        name: user.name,
        ...cleanData,
      };

      //Filter to only allowed fields
      const validFields = ["name", "birthdate", "location", "phone"];
      const filteredData = Object.keys(updateData)
        .filter((key) => validFields.includes(key))
        .reduce((obj, key) => ({ ...obj, [key]: updateData[key] }), {});

      if (Object.keys(filteredData).length === 0) {
        const error = new Error("Nenhum dado fornecido");
        error.status = 400;
        throw error;
      }
      if (filteredData.phone && !validatePhone(filteredData.phone)) {
        const error = new Error("Telefone inválido");
        error.status = 400;
        throw error;
      }
      if (filteredData.birthdate && !validateDate(filteredData.birthdate)) {
        const error = new Error("Data de nascimento inválida");
        error.status = 400;
        throw error;
      }
      const updatedUser = await profileRepository.updateProfile(
        userId,
        filteredData
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },
  //Update user avatar
  updateAvatar: async (userId, avatarUrl) => {
    try {
      if (!userId) {
        const error = new Error("ID é necessário");
        error.status = 400;
        throw error;
      }
      if (!avatarUrl) {
        const error = new Error("URL do avatar é obrigatória");
        error.status = 400;
        throw error;
      }
      const updatedUser = await profileRepository.updateAvatar(
        userId,
        avatarUrl
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { profileService };
