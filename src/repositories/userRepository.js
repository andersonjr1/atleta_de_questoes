const { pool } = require("../config/db");

//Handles user registration, authentication and retrieval
const userRepository = {
  //Registers a new user account
  register: async (data) => {
    try {
      const selectResponse = await pool.query(
        "SELECT * FROM accounts WHERE email = $1",
        [data.email]
      );

      if (selectResponse.rowCount != 0) {
        throw new Error("Conta existe!");
      }

      await pool.query(
        "INSERT INTO accounts (id, email, password, name, role) VALUES ($1, $2, $3, $4, $5)",
        [data.id, data.email, data.password, data.name, "user"]
      );

      return { id: data.id, email: data.email, name: data.name, role: "user" };
    } catch (error) {
      throw error;
    }
  },


  //Retrieves user by email for login
  login: async (email) => {
    try {
      const selectResponse = await pool.query(
        "SELECT * FROM accounts WHERE email = $1",
        [email]
      );

      const user = selectResponse.rows[0];

      return user;
    } catch (error) {
      throw error;
    }
  },
  
  //Retrieves all users 
  getAllUsers: async () => {
    const selectResponse = await pool.query(
      "SELECT id, email, name FROM accounts"
    );

    return selectResponse.rows;
  },
};

module.exports = { userRepository };
