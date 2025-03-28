const { pool } = require("../config/db.js");

const answerRepository = {
    saveAnswer: async (data) => {
        try {
            const { accountId, questionId, alternativeId, isExam } = data;

            const existingAnswer = await pool.query(
                `SELECT * FROM accounts_questions
                WHERE id_account = $1 AND id_question = $2`,
                [accountId, questionId]
            );

            let result;
            if (existingAnswer.rowCount > 0) {
                result = await pool.query(
                    `UPDATE accounts_questions
                    SET id_alternative = $1, exam = $2, answered_at = NOW()
                    WHERE id_account = $3 AND id_question = $4
                    RETURNING *`,
                    [alternativeId, isExam, accountId, questionId]
                );
            } else {
                result = await pool.query(
                    `INSERT INTO accounts_questions
                    (id_account, id_question, id_alternative, exam)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *`,
                    [accountId, questionId, alternativeId, isExam]
                );
            }

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
    }
};

module.exports = { answerRepository };