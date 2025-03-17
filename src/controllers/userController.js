const { userService } = require("../services");
const { v4 } = require("uuid");

const userController = {
  register: async (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const id = v4();
      const data = { id, name, email, password };
      const response = await userService.register(data);
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};

module.exports = { userController };
