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

  getAllUsers: async () => {
    const selectResponse = await pool.query(
      "SELECT id, email, name FROM accounts"
    );

    return selectResponse.rows;
  },

  getProfile: async (userId) => {
    const { rows } = await pool.query(
      `SELECT 
         id, email, name, phone,
         birthdate, location, avatar_url,
         level,
         created_at, updated_at
       FROM accounts 
       WHERE id = $1`,
      [userId]
    );
    return rows[0];
  },

  updateProfile: async (userId, updateData) => {
    const fields = Object.keys(updateData);
    const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');

    const { rows } = await pool.query(
      `UPDATE accounts 
     SET ${setClause}, updated_at = NOW()
     WHERE id = $${fields.length + 1}
     RETURNING *`,
      [...Object.values(updateData), userId]
    );
    return rows[0];
  },

  updateAvatar: async (userId, avatarUrl) => {
    const { rows } = await pool.query(
      `UPDATE accounts 
       SET avatar_url = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING avatar_url`,
      [avatarUrl, userId]
    );
    return rows[0]?.avatar_url;
  }
};

module.exports = { userRepository };
