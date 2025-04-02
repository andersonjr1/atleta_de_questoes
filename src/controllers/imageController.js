const { IP, PORT } = require("../config/env");

const imageController = {
  saveImage: (req, res) => {
    res
      .status(201)
      .json({ success: 1, path: `${IP}:${PORT}/images/${req.file.filename}` });
  },
};

module.exports = { imageController };
