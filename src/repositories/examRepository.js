const { pool } = require("../config/db.js");
const { questionRepository } = require("./questionRepository.js");
const { answerRepository } = require("./answerRepository.js");

const examRepository = {
  createExam: async (accountId) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const endTime = new Date(Date.now() + 30 * 60 * 1000);
      const result = await client.query(
        "INSERT INTO exams (id_user, limit_time) VALUES ($1, $2) RETURNING *",
        [accountId, endTime]
      );

      const examId = result.rows[0].id;
      const level = null;
      const questions = [];

      const questionsFirstDiscipline = await questionRepository.search({
        amount: 3,
        level,
        random: true,
        disciplinas: "ciencias-humanas",
      });

      const questionsSecondDiscipline = await questionRepository.search({
        amount: 3,
        level,
        random: true,
        disciplinas: "linguagens",
      });

      const questionsThirdDiscipline = await questionRepository.search({
        amount: 3,
        level,
        random: true,
        disciplinas: "ciencias-humanas",
      });

      const questionsForthDiscipline = await questionRepository.search({
        amount: 3,
        level,
        random: true,
        disciplinas: "matematica",
      });

      function cleanQuestion(question) {
        const newQuestion = {
          id: question.id,
          question_index: question.question_index,
          vestibular: question.vestibular,
          year: question.year,
          language: question.language,
          discipline: question.discipline,
          sub_discipline: question.sub_discipline,
          level: question.level,
          context: question.context,
          alternative_introduction: question.alternative_introduction,
          alternatives: question.alternatives.map((alternative) => ({
            id: alternative.id,
            letter: alternative.letter,
            alternative_text: alternative.alternative_text,
            file_url: alternative.file_url,
          })),
          support_file: question.support_file,
        };
        return newQuestion;
      }

      questionsFirstDiscipline.forEach((question) => {
        const newQuestion = cleanQuestion(question);
        questions.push(newQuestion);
      });

      questionsSecondDiscipline.forEach((question) => {
        const newQuestion = cleanQuestion(question);
        questions.push(newQuestion);
      });

      questionsThirdDiscipline.forEach((question) => {
        const newQuestion = cleanQuestion(question);
        questions.push(newQuestion);
      });

      questionsForthDiscipline.forEach((question) => {
        const newQuestion = cleanQuestion(question);
        questions.push(newQuestion);
      });

      questions.forEach(async (question) => {
        const values = [examId, question.id];
        await client.query(
          "INSERT INTO exam_questions (id_exam, id_question) VALUES ($1, $2)",
          values
        );
      });
      const exam = result.rows[0];
      exam.questions = questions;
      await client.query("COMMIT");
      return exam;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  saveExamQuestionResponse: async (
    examId,
    questionId,
    accountId,
    alternativeId
  ) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const responseExam = await client.query(
        "SELECT * FROM exams WHERE id = $1",
        [examId]
      );

      if (responseExam.rowCount === 0) {
        throw new Error("Exame não encontrado");
      }

      const exam = responseExam.rows[0];

      if (exam.id_user !== accountId) {
        throw new Error("Você não tem permissão para responder este exame");
      }

      if (exam.done) {
        throw new Error("Este exame já foi respondido");
      }

      if (exam.limit_time < new Date()) {
        throw new Error("Este exame já expirou");
      }

      const responseQuestion = await client.query(
        "SELECT * FROM exam_questions WHERE id_exam = $1 AND id_question = $2",
        [examId, questionId]
      );

      if (responseQuestion.rowCount === 0) {
        throw new Error("Questão não encontrada no exame");
      }
      const response = await client.query(
        "UPDATE exam_questions SET id_question_alternative = $1, updated_at = NOW() WHERE id_exam = $2 AND id_question = $3 RETURNING *",
        [alternativeId, examId, questionId]
      );
      await client.query("COMMIT");
      return response.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  respondExam: async (examId, accountId) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const responseExam = await client.query(
        "SELECT * FROM exams WHERE id = $1",
        [examId]
      );

      const exam = responseExam.rows[0];

      if (exam.done) {
        throw new Error("Este exame já foi respondido");
      }

      const examAnswers = await client.query(
        "SELECT * FROM exam_questions WHERE id_exam = $1",
        [examId]
      );

      examAnswers.rows.forEach(async (answer) => {
        await client.query(
          `INSERT INTO accounts_questions
                  (id_account, id_question, id_alternative, id_exam_question)
                  VALUES ($1, $2, $3, $4)
                  RETURNING *`,
          [
            accountId,
            answer.id_question,
            answer.id_question_alternative,
            answer.id,
          ]
        );
      });

      await client.query("UPDATE exams SET done = true WHERE id = $1", [
        examId,
      ]);

      let query = `
          SELECT
              e.id,
              e.limit_time,
              e.done,
              json_agg(
                  json_build_object(
                      'id', q.id,
                      'question_index', q.question_index,
                      'vestibular', q.vestibular,
                      'explanation', q.explanation,
                      'year', q.year,
                      'language', q.language,
                      'discipline', q.discipline,
                      'sub_discipline', q.sub_discipline,
                      'level', q.level,
                      'context', q.context,
                      'alternative_introduction', q.alternative_introduction,
                      'selected_alternative_id', aq.id_alternative,
                      'answer_id', aq.id,
                      'answered_at', aq.answered_at,
                      'alternatives', (
                          SELECT json_agg(
                              json_build_object(
                                  'id', qa.id,
                                  'file', qa.file_url,
                                  'alternative_text', qa.alternative_text,
                                  'letter', qa.letter,
                                  'is_correct', qa.is_correct
                              )
                          ) FROM question_alternatives qa WHERE qa.id_question = q.id
                      ),
                      'support_file', (
                          SELECT json_agg(DISTINCT qf.file_url) FROM question_files qf WHERE qf.id_question = q.id
                      ),
                      'support_urls', (
                          SELECT json_agg(DISTINCT qs.support_url) FROM question_support qs WHERE qs.id_question = q.id
                      )
                  )
              ) AS questions
          FROM exams e
          LEFT JOIN exam_questions eq ON e.id = eq.id_exam
          LEFT JOIN questions q ON eq.id_question = q.id
          LEFT JOIN accounts_questions aq ON q.id = aq.id_question
          WHERE e.id = $1
          GROUP BY e.id, e.limit_time, e.done;
            `;

      const response = await client.query(query, [examId]);
      await client.query("COMMIT");
      return response.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  getAllExams: async (accountId) => {
    try {
      let query = `
          SELECT
              e.id,
              e.limit_time,
              e.done,
              json_agg(
                  json_build_object(
                      'id', q.id,
                      'question_index', q.question_index,
                      'vestibular', q.vestibular,
                      'explanation', q.explanation,
                      'year', q.year,
                      'language', q.language,
                      'discipline', q.discipline,
                      'sub_discipline', q.sub_discipline,
                      'level', q.level,
                      'context', q.context,
                      'alternative_introduction', q.alternative_introduction,
                      'selected_alternative_id', aq.id_alternative,
                      'answer_id', aq.id,
                      'answered_at', aq.answered_at,
                      'alternatives', (
                          SELECT json_agg(
                              json_build_object(
                                  'id', qa.id,
                                  'file', qa.file_url,
                                  'alternative_text', qa.alternative_text,
                                  'letter', qa.letter,
                                  'is_correct', qa.is_correct
                              )
                          ) FROM question_alternatives qa WHERE qa.id_question = q.id
                      ),
                      'support_file', (
                          SELECT json_agg(DISTINCT qf.file_url) FROM question_files qf WHERE qf.id_question = q.id
                      ),
                      'support_urls', (
                          SELECT json_agg(DISTINCT qs.support_url) FROM question_support qs WHERE qs.id_question = q.id
                      )
                  )
              ) AS questions
          FROM exams e
          LEFT JOIN exam_questions eq ON e.id = eq.id_exam
          LEFT JOIN questions q ON eq.id_question = q.id
          LEFT JOIN accounts_questions aq ON q.id = aq.id_question
          WHERE e.id_user = $1
          GROUP BY e.id, e.limit_time, e.done
          ORDER BY e.limit_time ASC;
            `;

      const response = await pool.query(query, [accountId]);
      return response.rows;
    } catch (error) {
      throw error;
    }
  },
  getExamById: async (accountId, examId) => {
    try {
      let query = `
      SELECT
          e.id,
          e.limit_time,
          e.done,
          json_agg(
              json_build_object(
                  'id', q.id,
                  'question_index', q.question_index,
                  'vestibular', q.vestibular,
                  'explanation', q.explanation,
                  'year', q.year,
                  'language', q.language,
                  'discipline', q.discipline,
                  'sub_discipline', q.sub_discipline,
                  'level', q.level,
                  'context', q.context,
                  'alternative_introduction', q.alternative_introduction,
                  'selected_alternative_id', aq.id_alternative,
                  'answer_id', aq.id,
                  'answered_at', aq.answered_at,
                  'alternatives', (
                      SELECT json_agg(
                          json_build_object(
                              'id', qa.id,
                              'file', qa.file_url,
                              'alternative_text', qa.alternative_text,
                              'letter', qa.letter,
                              'is_correct', qa.is_correct
                          )
                      ) FROM question_alternatives qa WHERE qa.id_question = q.id
                  ),
                  'support_file', (
                      SELECT json_agg(DISTINCT qf.file_url) FROM question_files qf WHERE qf.id_question = q.id
                  ),
                  'support_urls', (
                      SELECT json_agg(DISTINCT qs.support_url) FROM question_support qs WHERE qs.id_question = q.id
                  )
              )
          ) AS questions
      FROM exams e
      LEFT JOIN exam_questions eq ON e.id = eq.id_exam
      LEFT JOIN questions q ON eq.id_question = q.id
      LEFT JOIN accounts_questions aq ON q.id = aq.id_question
      WHERE e.id_user = $1 AND e.id = $2
      GROUP BY e.id, e.limit_time, e.done
        `;

      const response = await pool.query(query, [accountId, examId]);
      return response.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { examRepository };
