const { userService } = require("../services");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/env");
const { validateEmail } = require("../utils/validators/validateEmail");
const { validadeName } = require("../utils/validators/validateName");
const { validatePassword } = require("../utils/validators/validatePassword");

const userController = {
  register: async (req, res) => {
    try {
      let name = req.body.name;
      let email = req.body.email;
      let password = req.body.password;

      if (!name) {
        return res.status(400).json("Digite um nome");
      }

      if (!email) {
        return res.status(400).json("Digite um email");
      }

      if (!password) {
        return res.status(400).json("Digite uma senha");
      }

      name = name.trim();

      email = email.trim();

      password = password.trim();

      if (!validadeName(name)) {
        return res
          .status(401)
          .json(
            "Digite um nome sem acentos, sem números e entre 3 a 60 digitos"
          );
      }

      if (!validateEmail(email)) {
        return res.status(401).json("Digite um email válido");
      }

      if (!validatePassword(password)) {
        return res
          .status(401)
          .json(
            "Digite uma senha entre 8 a 30 digitos com no mínimo um número, uma letra maiuscula e uma minuscula"
          );
      }

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
      res.status(400).json(error.message);
    }
  },
};

module.exports = { userController };
