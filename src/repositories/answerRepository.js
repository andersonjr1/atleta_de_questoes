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
                WHERE id_account = $1 AND id_question = $2`,
                [accountId, questionId]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    getUserAnsweredQuestions: async (accountId, { page = 1, limit = 10, fromDate, toDate }) => {
        try {
            const offset = (page - 1) * limit;
            let query = `
            SELECT
                aq.id,
                q.id AS question_id,
                q.title AS question_title,
                q.context AS question_context,
                qa.id AS alternative_id,
                qa.text AS alternative_text,
                qa.is_correct AS is_correct,
                aq.exam AS is_exam,
                aq.answered_at
            FROM accounts_questions aq
            JOIN questions q ON aq.id_question = q.id
            JOIN question_alternatives qa ON aq.id_alternative = qa.id
            WHERE aq.id_account = $1
        `;

            const params = [accountId];
            let paramIndex = 2;

            if (fromDate) {
                query += `AND aq.answered_at >= $${paramIndex++}`;
                params.push(new Date(fromDate));
            }

            if (toDate) {
                query += ` AND aq.answered_at <= $${paramIndex++}`;
                params.push(new Date(toDate));
            }

            query += `
                ORDER BY aq.answered_at DESC
                LIMIT $${paramIndex++} OFFSET $${paramIndex}
            `;
            params.push(limit, offset);

            const result = await pool.query(query, params);
            return result.rows;
            
        } catch (error) {
            throw error;
        }
    },
};

module.exports = { answerRepository };