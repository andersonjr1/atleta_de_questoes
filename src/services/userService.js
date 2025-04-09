const { userRepository } = require("../repositories");
const { hashPassword } = require("../utils/hashPassword");
const { comparePassword } = require("../utils/comparePassword");
const { validateEmail } = require("../utils/validators/validateEmail");
const { validadeName } = require("../utils/validators/validateName");
const { validatePassword } = require("../utils/validators/validatePassword");
const { validatePhone } = require("../utils/validators/validatePhone");
const { validateDate } = require("../utils/validators/validateDate");

const userService = {
  register: async (data) => {
    try {
      const id = data.id;
      let name = data.name;
      let email = data.email;
      let password = data.password;

      if (!name) {
        const error = new Error("Digite um nome");
        error.status = 400;
        throw error;
      }

      if (!email) {
        const error = new Error("Digite um email");
        error.status = 400;
        throw error;
      }

      if (!password) {
        const error = new Error("Digite uma senha");
        error.status = 400;
        throw error;
      }

      name = name.trim();
      email = email.trim();
      password = password.trim();

      if (!validadeName(name)) {
        const error = new Error(
          "Digite um nome sem acentos, sem números e entre 3 a 60 digitos"
        );
        error.status = 401;
        throw error;
      }

      if (!validateEmail(email)) {
        const error = new Error("Digite um email válido");
        error.status = 401;
        throw error;
      }

      if (!validatePassword(password)) {
        const error = new Error(
          "Digite uma senha entre 8 a 30 digitos com no mínimo um número, uma letra maiuscula e uma minuscula"
        );
        error.status = 401;
        throw error;
      }

      const hashedPassword = hashPassword(password);

      const response = await userRepository.register({
        id,
        email,
        password: hashedPassword,
        name,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      if (!email || !password) {
        const error = new Error("Email e senha são obrigatórios");
        error.status = 400;
        throw error;
      }

      email = email.trim();
      password = password.trim();

      if (!validateEmail(email) || !validatePassword(password)) {
        const error = new Error("Email ou senha inválidos");
        error.status = 401;
        throw error;
      }

      const user = await userRepository.login(email);

      if (!user) {
        const error = new Error("Usuário não encontrado");
        error.status = 404;
        throw error;
      }

      const isPasswordValid = comparePassword(password, user.password);

      if (!isPasswordValid) {
        const error = new Error("Senha inválida");
        error.status = 401;
        throw error;
      }

      const {
        password: _,
        created_at: __,
        updated_at: ___,
        ...userWithoutSensitiveData
      } = user;
      return userWithoutSensitiveData;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { userService };
