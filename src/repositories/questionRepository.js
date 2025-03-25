const { pool } = require("../config/db.js");

const questionRepository = {
    getById: async (id) => {
        try {
            const result = await pool.query("SELECT * FROM questions WHERE id = $1", [id]);
            if (result.rowCount === 0) {
                throw new Error("Questão não encontrada");
            }
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },
};

module.exports = { questionRepository };