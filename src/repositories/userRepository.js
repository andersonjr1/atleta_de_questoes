const { pool } = require("../config/db");

const userRepository = {
  register: async (data) => {
    try {
      const selectResponse = await pool.query(
        "SELECT * FROM accounts WHERE email = $1",
        [data.email]
      );

      if (selectResponse.rowCount != 0) {
        throw new Error("Conta existe!");
      }

      const insertResponse = await pool.query(
        "INSERT INTO accounts (id, email, password, name, role) VALUES ($1, $2, $3, $4, $5)",
        [data.id, data.email, data.password, data.name, "user"]
      );

      return { id: data.id, email: data.email, name: data.name, role: "user" };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { userRepository };
