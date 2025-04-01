const { pool } = require("../config/db.js");
const { questionRepository } = require("./questionRepository.js");

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
        console.log(values);
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

      console.log(response);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = { examRepository };
