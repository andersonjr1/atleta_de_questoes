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
  getUserAnswers: async (queryObject) => {
    try {
      let query = `
            SELECT 
                        q.id,
                        aq.id_alternative as selected_alternative_id,
                        aq.id as answer_id,
                        aq.id_exam_question,
                        aq.answered_at,
                        q.question_index, 
                        q.vestibular, 
                        q.explanation,
                        q.year, 
                        q.language, 
                        q.discipline, 
                        q.sub_discipline, 
                        q.level, 
                        q.context, 
                        q.alternative_introduction,
                        json_agg(
                            json_build_object(
                                'id', qa.id,
                                'file', qa.file_url,
                                'alternative_text', qa.alternative_text,
                                'letter', qa.letter,
                                'is_correct', qa.is_correct,
                                'is_correct', qa.is_correct
                            )
                        ) AS alternatives,
                        json_agg(DISTINCT qf.file_url) AS support_file,
                        json_agg(DISTINCT qs.support_url) AS support_urls
                    FROM questions q
                    LEFT JOIN question_alternatives qa ON q.id = qa.id_question
                    LEFT JOIN question_support qs ON q.id = qs.id_question
                    LEFT JOIN question_files qf ON q.id = qf.id_question
                    LEFT JOIN accounts_questions aq ON q.id = aq.id_question
                    WHERE aq.id_account = $1`;
      const values = [queryObject.accountId];

      let paramIndex = 2;

      if (queryObject.startDate && queryObject.endDate) {
        query += ` AND aq.answered_at BETWEEN $${paramIndex} AND $${
          paramIndex + 1
        }`;
        values.push(
          new Date(queryObject.startDate + "T00:00:00"),
          new Date(queryObject.endDate + "T23:59:59")
        );
        paramIndex += 2;
      }

      query += ` GROUP BY q.id, aq.id ORDER BY aq.answered_at DESC`;

      if (queryObject.limit && queryObject.page) {
        query += ` OFFSET $${paramIndex} LIMIT $${paramIndex + 1} `;
        values.push(queryObject.startIndex, queryObject.limit + 1);
        paramIndex += 2;
      }

      const result = await pool.query(query, values);

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
