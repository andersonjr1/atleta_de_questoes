const { userRepository } = require("../repositories");
const { hashPassword } = require("../utils/hashPassword");
const { comparePassword } = require("../utils/comparePassword")
const userService = {
  register: async (data) => {
    try {
      const id = data.id;
      let name = data.name;
      let email = data.email;
      let password = data.password;

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
      const user = await userRepository.login(email);
      if (!user) {
        throw new Error("Invalid email");
      }
      const isPasswordValid = comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const {password: _, ...userWithoutPassword} = user;
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { userService };
