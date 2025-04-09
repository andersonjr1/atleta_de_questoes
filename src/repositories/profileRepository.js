const { pool } = require("../config/db");

const profileRepository = {
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
    if (updateData.birthdate) {
      const [dia, mes, ano] = updateData.birthdate.split("/").map(Number);
      updateData.birthdate = new Date(ano, mes - 1, dia);
    }
    const setClause = fields
      .map((field, i) => `${field} = $${i + 1}`)
      .join(", ");

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
  },
};

module.exports = { profileRepository };
