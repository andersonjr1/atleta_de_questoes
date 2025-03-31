const { pool } = require("../config/db.js");

const questionRepository = {
  getById: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM questions WHERE id = $1", [
        id,
      ]);
      if (result.rowCount === 0) {
        throw new Error("Questão não encontrada");
      }
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const result = await pool.query(
        "DELETE FROM questions WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rowCount === 0) {
        throw Object.assign(new Error("Questão não encontrada"), {
          status: 404,
        });
      }

      return { message: "Questão deletada com sucesso" };
    } catch (error) {
      throw error;
    }
  },
  create: async (question) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const response = await client.query(
        "INSERT INTO questions (vestibular, year, question_index, language, context, alternative_introduction, explanation, discipline, sub_discipline, level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [
          question.vestibular,
          question.year,
          question.question_index,
          question.language,
          question.context,
          question.alternative_introduction,
          question.explanation,
          question.discipline,
          question.sub_discipline,
          question.level,
        ]
      );

      const questionId = await response.rows[0].id;

      if (question.alternatives) {
        for (const alternative of question.alternatives) {
          const response = await client.query(
            "INSERT INTO question_alternatives (id_question, letter, alternative_text, file_url, is_correct) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [
              questionId,
              alternative.letter,
              alternative.text,
              alternative.file_url,
              alternative.is_correct,
            ]
          );
        }
      } else {
        const error = new Error("Questão sem alternativas");
        error.status = 400;
        throw error;
      }

      if (question.question_files) {
        for (const file of question.question_files) {
          const response = await client.query(
            "INSERT INTO question_files (id_question, file_url) VALUES ($1, $2) RETURNING *",
            [questionId, file]
          );
        }
      }

      if (question.support_urls) {
        for (const supportLink of question.support_urls) {
          const response = await client.query(
            "INSERT INTO question_support (id_question, support_url) VALUES ($1, $2) RETURNING *",
            [questionId, supportLink]
          );
        }
      }

      await client.query("COMMIT");
      return response.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  search: async (filters) => {
    try {
      let query = `
                    SELECT 
                        q.id, 
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
                                'is_correct', qa.is_correct
                            )
                        ) AS alternatives,
                        json_agg(DISTINCT qf.file_url) AS support_file,
                        json_agg(DISTINCT qs.support_url) AS support_urls
                    FROM questions q
                    LEFT JOIN question_alternatives qa ON q.id = qa.id_question
                    LEFT JOIN question_support qs ON q.id = qs.id_question
                    LEFT JOIN question_files qf ON q.id = qf.id_question
                    WHERE 1=1
                `;

      const values = [];
      let paramIndex = 1;

      if (filters.vestibular) {
        query += ` AND q.vestibular = $${paramIndex}`;
        values.push(filters.vestibular);
        paramIndex++;
      }

      if (filters.disciplinas) {
        filters.disciplinas = filters.disciplinas.split(",");
        query += ` AND q.discipline = ANY($${paramIndex})`;
        values.push(filters.disciplinas);
        paramIndex++;
      }

      if (filters.ano) {
        filters.ano = filters.ano.split(",").map((ano) => Number(ano));
        query += ` AND q.year = ANY($${paramIndex})`;
        values.push(filters.ano);
        paramIndex++;
      }

      if (filters.level) {
        filters.level = filters.level.split(",").map((level) => Number(level));
        query += ` AND q.level = ANY($${paramIndex})`;
        values.push(filters.level);
        paramIndex++;
      }

      if (filters.random && filters.random === "true") {
        query += " ORDER BY RANDOM()";
      }

      if (filters.amount) {
        query += ` LIMIT $${paramIndex}`;
        values.push(parseInt(filters.amount, 10));
      }

      query +=
        " GROUP BY q.id, q.question_index, q.year, q.language, q.discipline, q.sub_discipline, q.level, q.context, q.alternative_introduction, q.explanation";

      const result = await pool.query(query, values);

      return result.rows;
    } catch (error) {
      throw new Error("Erro ao buscar questões: " + error.message);
    }
  },
  getAllQuestions: async () => {
    try {
      const result = await pool.query(`
        SELECT 
                    q.id, 
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
                            'is_correct', qa.is_correct
                        )
                    ) AS alternatives,
                    json_agg(DISTINCT qf.file_url) AS support_file,
                    json_agg(DISTINCT qs.support_url) AS support_urls
                FROM questions q
                LEFT JOIN question_alternatives qa ON q.id = qa.id_question
                LEFT JOIN question_support qs ON q.id = qs.id_question
                LEFT JOIN question_files qf ON q.id = qf.id_question
                GROUP BY q.id
        `);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getPaginatedQuestions: async (query) => {
    try {
      const { page, limit } = query;
      const offset = (page - 1) * limit;
      const result = await pool.query(
        `
        SELECT 
            q.id, 
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
                    'is_correct', qa.is_correct
                )
            ) AS alternatives,
            json_agg(DISTINCT qf.file_url) AS support_file,
            json_agg(DISTINCT qs.support_url) AS support_urls
        FROM questions q
        LEFT JOIN question_alternatives qa ON q.id = qa.id_question
        LEFT JOIN question_support qs ON q.id = qs.id_question
        LEFT JOIN question_files qf ON q.id = qf.id_question
        GROUP BY q.id
        LIMIT $1 OFFSET $2
        `,
        [limit + 1, offset]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { questionRepository };
