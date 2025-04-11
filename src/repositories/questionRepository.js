const { pool } = require("../config/db.js");

//Handles searches for questions
const questionRepository = {
  getById: async (id) => {
    try {
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
                        (SELECT json_agg(
                                    json_build_object(
                                        'id', qa.id,
                                        'file', qa.file_url,
                                        'alternative_text', qa.alternative_text,
                                        'letter', qa.letter,
                                        'is_correct', qa.is_correct
                                    )
                                )
                        FROM question_alternatives qa 
                        WHERE qa.id_question = q.id) AS alternatives,
                        (SELECT json_agg(DISTINCT qf.file_url) 
                        FROM question_files qf 
                        WHERE qf.id_question = q.id) AS support_file,
                        (SELECT json_agg(DISTINCT qs.support_url) 
                        FROM question_support qs 
                        WHERE qs.id_question = q.id) AS support_urls
                    FROM questions q
                    WHERE q.id = $1
                `,
        [id]
      );

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
          await client.query(
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
          await client.query(
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
  update: async (id, data) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        `UPDATE questions 
                SET 
                    question_index = COALESCE($1, question_index),
                    year = COALESCE($2, year),
                    language = COALESCE($3, language),
                    discipline = COALESCE($4, discipline),
                    context = COALESCE($5, context),
                    vestibular = COALESCE($6, vestibular),
                    alternative_introduction = COALESCE($7, alternative_introduction),
                    sub_discipline = COALESCE($8, sub_discipline),
                    level = COALESCE($9, level),
                    explanation = COALESCE($10, explanation)
                WHERE id = $11
                RETURNING *;`,
        [
          data.question_index ?? null,
          data.year ?? null,
          data.language ?? null,
          data.discipline ?? null,
          data.context ?? null,
          data.vestibular ?? null,
          data.alternative_introduction ?? null,
          data.sub_discipline ?? null,
          data.level ?? null,
          data.explanation ?? null,
          id,
        ]
      );

      if (data.alternatives) {
        await client.query(
          "DELETE FROM question_alternatives WHERE id_question = $1",
          [id]
        );
        for (const alternative of data.alternatives) {
          await client.query(
            "INSERT INTO question_alternatives (id_question, letter, alternative_text, file_url, is_correct) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [
              id,
              alternative.letter,
              alternative.text,
              alternative.file_url,
              alternative.is_correct,
            ]
          );
        }

        if (data.support_urls) {
          await client.query(
            "DELETE FROM question_support WHERE id_question = $1",
            [id]
          );
          for (const url of data.support_urls) {
            const response = await client.query(
              "INSERT INTO question_support (id_question, support_url) VALUES ($1, $2) RETURNING *",
              [id, url]
            );
          }
        }

        if (data.question_files) {
          await client.query(
            "DELETE FROM question_files WHERE id_question = $1",
            [id]
          );
          for (const file of data.question_files) {
            const response = await client.query(
              "INSERT INTO question_files (id_question, file_url) VALUES ($1, $2) RETURNING *",
              [id, file]
            );
          }
        }

        await client.query("COMMIT");
        return "Alterado com sucesso";
      }
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
                        (SELECT json_agg(
                                    json_build_object(
                                        'id', qa.id,
                                        'file', qa.file_url,
                                        'alternative_text', qa.alternative_text,
                                        'letter', qa.letter,
                                        'is_correct', qa.is_correct
                                    )
                                )
                        FROM question_alternatives qa 
                        WHERE qa.id_question = q.id) AS alternatives,
                        (SELECT json_agg(DISTINCT qf.file_url) 
                        FROM question_files qf 
                        WHERE qf.id_question = q.id) AS support_file,
                        (SELECT json_agg(DISTINCT qs.support_url) 
                        FROM question_support qs 
                        WHERE qs.id_question = q.id) AS support_urls
                    FROM questions q
                    WHERE 1=1
                `;

      const values = [];
      let paramIndex = 1;

      if (filters.id) {
        query += ` AND q.id = $${paramIndex}::uuid`;
        values.push(filters.id.trim());
        paramIndex++;
      }

      if (filters.texto) {
        query += ` AND LOWER(q.context) LIKE LOWER($${paramIndex})`;
        values.push(`%${filters.texto}%`);
        paramIndex++;
      }

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

      if (filters.assunto) {
        filters.assunto = filters.assunto.split(",");
        query += ` AND q.sub_discipline = ANY($${paramIndex})`;
        values.push(filters.assunto);
        paramIndex++;
      }

      if (filters.ano) {
        filters.ano = filters.ano.split(",").map((ano) => Number(ano));
        query += ` AND q.year = ANY($${paramIndex})`;
        values.push(filters.ano);
        paramIndex++;
      }

      if (filters.level) {
        filters.level = String(filters.level)
          .split(",")
          .map((level) => Number(level));
        query += ` AND q.level = ANY($${paramIndex})`;
        values.push(filters.level);
        paramIndex++;
      }

      if (filters.random || filters.random === "true") {
        query += " ORDER BY RANDOM()";
      }

      if (filters.limit && filters.page) {
        query += ` OFFSET $${paramIndex} LIMIT $${paramIndex + 1} `;
        values.push(filters.startIndex, filters.limit + 1);
        paramIndex += 2;
      }

      if (filters.amount && !filters.page) {
        query += ` LIMIT $${paramIndex}`;
        values.push(parseInt(filters.amount, 10));
      }

      const result = await pool.query(query, values);

      return result.rows;
    } catch (error) {
      throw new Error("Erro ao buscar questões: " + error.message);
    }
  },
};

module.exports = { questionRepository };
