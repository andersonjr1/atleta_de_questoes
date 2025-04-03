const { userService } = require("../services");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/env");

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body

      const id = v4();
      const data = { id, name, email, password };
      const response = await userService.register(data);
      const signature = jwt.sign(response, SECRET_KEY, { expiresIn: "7d" });

      res.cookie("SESSION_ID", signature, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      res.status(201).json(response);
    } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const response = await userService.login(email, password);
      const signature = jwt.sign(response, SECRET_KEY, { expiresIn: "7d" });

      res.cookie("SESSION_ID", signature, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        token: signature,
        user: response
      });
      } catch (error) {
      const statusCode = error.status || 500;
      res.status(statusCode).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("SESSION_ID");
      res.status(200).json({ message: "Fez o logout com sucesso" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

module.exports = { userController };