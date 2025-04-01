const { pool } = require("../config/db.js");

const answerRepository = {
  saveNormalAnswer: async (data) => {
    try {
      const { accountId, questionId, alternativeId } = data;

      const result = await pool.query(
        `INSERT INTO accounts_questions
                  (id_account, id_question, id_alternative)
                  VALUES ($1, $2, $3)
                  RETURNING *`,
        [accountId, questionId, alternativeId]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  getUserAnswers: async (accountId) => {
    try {
      const result = await pool.query(
        `SELECT * FROM accounts_questions
                WHERE id_account = $1`,
        [accountId]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  getSpecificAnswer: async (accountId, questionId) => {
    try {
      const result = await pool.query(
        `SELECT * FROM accounts_questions
                WHERE id_account = $1 AND id_questio = $2`,
        [accountId, questionId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { answerRepository };
