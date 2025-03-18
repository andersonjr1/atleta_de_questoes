const { userRepository } = require("../repositories");
const { hashPassword } = require("../utils/hashPassword");

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
};

module.exports = { userService };
