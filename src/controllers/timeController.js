const timeController = {
  getTime: (req, res) => {
    res.status(200).json({ time: new Date() });
  },
};

module.exports = { timeController };
