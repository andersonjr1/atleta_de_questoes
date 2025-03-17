const { userRepository } = require("../repositories");

const userService = {
  register: async (data) => {
    try {
      const id = data.id;
      let name = data.name;
      let email = data.email;
      let password = data.password;

      const response = await userRepository.register({
        id,
        email,
        password,
        name,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { userService };
