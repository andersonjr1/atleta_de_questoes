const { profileService } = require("../services");

const profileController = {
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const profile = await profileService.getProfile(userId);

      res.status(200).json(profile);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },

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
