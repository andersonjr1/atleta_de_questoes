const { profileService } = require("../services");

//Handles HTTP requests related to a user profile operations
const profileController = {
  //Get user profile
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id; //Extracted from JWT token

      //Fetch profile from service layer
      const profile = await profileService.getProfile(userId);

      res.status(200).json(profile);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },

  //Update user profile information
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, phone, birthdate, location } = req.body;

      const updateData = { name, phone, birthdate, location };
      const updatedUser = await profileService.updateProfile(
        userId,
        updateData
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },

  //Update user avatar
  updateAvatar: async (req, res) => {
    try {
      const userId = req.user.id;
      const avatarUrl = `/uploads/avatars/${req.file.filename}`;

      await profileService.updateAvatar(userId, avatarUrl);
      res.status(200).json({ avatarUrl });
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
};

module.exports = { profileController };
