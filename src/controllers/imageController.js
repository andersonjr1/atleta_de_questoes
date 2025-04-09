const imageController = {
  saveImage: (req, res) => {
    res.status(201).json({ success: 1, path: `/images/${req.file.filename}` });
  },
};

module.exports = { imageController };
