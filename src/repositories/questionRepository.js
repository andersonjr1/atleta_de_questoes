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
    update: async (id, data) => {
        try {
            const result = await pool.query(
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
                    explanation = COALESCE($10, explanation),
                    alternatives = COALESCE($11::jsonb, alternatives),
                    support_urls = COALESCE($12::jsonb, support_urls),
                    question_files = COALESCE($13::jsonb, question_files)
                WHERE id = $14
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
                    data.alternatives ? JSON.stringify(data.alternatives) : null,
                    data.support_urls ? JSON.stringify(data.support_urls) : null,
                    data.question_files ? JSON.stringify(data.question_files) : null,
                    id
                ]
            );
    
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
};

module.exports = { questionRepository };