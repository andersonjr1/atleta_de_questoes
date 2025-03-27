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
    search: async (filters) => {
        try {
            let query = `
                SELECT 
                    q.id, 
                    q.title, 
                    q.question_index, 
                    q.year, 
                    q.language, 
                    q.discipline, 
                    q.sub_discipline, 
                    q.level, 
                    q.context, 
                    q.alternative_introduction,
                    json_agg(
                        json_build_object(
                            'letter', qa.letter,
                            'text', qa.text,
                            'is_correct', qa.is_correct
                        )
                    ) AS alternatives,
                    json_agg(qs.support_url) as support_urls,
                    json_agg(qf.file_url) as support_file
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
                if (Array.isArray(filters.disciplinas)) {
                    query += ` AND q.discipline = ANY($${paramIndex})`;
                } else {
                    query += ` AND q.discipline = $${paramIndex}`;
                }
                values.push(filters.disciplinas);
                paramIndex++;
            }

            if (filters.ano) {
                if (Array.isArray(filters.ano)) {
                    query += ` AND q.year = ANY($${paramIndex})`;
                } else {
                    query += ` AND q.year = $${paramIndex}`;
                }
                values.push(filters.ano);
                paramIndex++;
            }

            if (filters.level) {
                if (Array.isArray(filters.level)) {
                    query += ` AND q.level = ANY($${paramIndex})`;
                } else {
                    query += ` AND q.level = $${paramIndex}`;
                }
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
                " GROUP BY q.id, q.title, q.question_index, q.year, q.language, q.discipline, q.sub_discipline, q.level, q.context, q.alternative_introduction";

            const result = await pool.query(query, values);

            return result.rows;
        } catch (error) {
            throw new Error("Erro ao buscar questões: " + error.message);
        }
    },
};

module.exports = { questionRepository };
