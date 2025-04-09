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
        const error = new Error("Digite um nome sem acentos, sem números e entre 3 a 60 digitos");
        error.status = 401;
        throw error;
      }

      if (!validateEmail(email)) {
        const error = new Error("Digite um email válido");
        error.status = 401;
        throw error;
      }

      if (!validatePassword(password)) {
        const error = new Error("Digite uma senha entre 8 a 30 digitos com no mínimo um número, uma letra maiuscula e uma minuscula");
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
      if ((!email) || (!password)) {
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

      const { password: _, created_at: __, updated_at: ___, ...userWithoutSensitiveData } = user;
      return userWithoutSensitiveData;
    } catch (error) {
      throw error;
    }
  },

  getProfile: async (userId) => {
    try {
      if (!userId) {
        const error = new Error("ID é necessário");
        error.status = 400;
        throw error;
      }
      const user = await userRepository.getProfile(userId);
      if (!user) {
        const error = new Error("Usuário não encontrado");
        error.status = 404;
        throw error;
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (userId, data) => {
    try {
      if (!userId) {
        const error = new Error("ID é necessário");
        error.status = 400;
        throw error;
      }

      const user = await userRepository.getProfile(userId);
      if (!user) throw { status: 404, message: "Usuário não encontrado" };

      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
      );

      const updateData = {
        name: user.name,
        ...cleanData      
      };

      const validFields = ['name', 'birthdate', 'location', 'phone'];
      const filteredData = Object.keys(updateData)
        .filter(key => validFields.includes(key))
        .reduce((obj, key) => ({ ...obj, [key]: updateData[key] }), {});

      if (Object.keys(filteredData).length === 0) {
        const error = new Error("Nenhum dado fornecido");
        error.status = 400;
        throw error;
      }
      if (filteredData.phone && !validatePhone(filteredData.phone)) {
        const error = new Error("Telefone inválido");
        error.status = 400;
        throw error;
      }
      if (filteredData.birthdate && !validateDate(filteredData.birthdate)) {
        const error = new Error("Data de nascimento inválida");
        error.status = 400;
        throw error;
      }
      console.log("Dados do usuário atual:", user);
      console.log("Dados preparados para atualização:", filteredData);
      const updatedUser = await userRepository.updateProfile(userId, filteredData);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },
  updateAvatar: async (userId, avatarUrl) => {
    try {
      if (!userId) {
        const error = new Error("ID é necessário");
        error.status = 400;
        throw error;
      }
      if (!avatarUrl) {
        const error = new Error("URL do avatar é obrigatória");
        error.status = 400;
        throw error;
      }
      const updatedUser = await userRepository.updateAvatar(userId, avatarUrl);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { userService };
