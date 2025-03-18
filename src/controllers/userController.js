const { userService } = require("../services");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/env");

const userController = {
  register: async (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const id = v4();
      const data = { id, name, email, password };
      const response = await userService.register(data);
      const signature = jwt.sign(response, SECRET_KEY, { expiresIn: "7d" });
      console.log(signature);
      res.cookie("SESSION_ID", signature, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};

module.exports = { userController };
