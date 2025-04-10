const { pool } = require("../config/db.js");
const { questionRepository } = require("./questionRepository.js");

//Repository for exam-related database operations
const examRepository = {
  //Creates a new exam for the authenticated user
  createExam: async function (user, userPoints) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      //Create exam with 30-minutes time limit
      const endTime = new Date(Date.now() + 30 * 60 * 1000);
      const result = await client.query(
        "INSERT INTO exams (id_user, limit_time) VALUES ($1, $2) RETURNING *",
        [user.id, endTime]
      );

      const examId = result.rows[0].id;
      const level = userPoints.level;

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
        disciplinas: "ciencias-natureza",
      });

      const questionsForthDiscipline = await questionRepository.search({
        amount: 3,
        level,
        random: true,
        disciplinas: "matematica",
      });

      questionsFirstDiscipline.forEach(async (question) => {
        const letters = ["A", "B", "C", "D", "E"];
        const randomLetters = [];

        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          randomLetters.push(letters[randomIndex]);
          letters.splice(randomIndex, 1);
        }
        const values = [examId, question.id, randomLetters];
        await client.query(
          "INSERT INTO exam_questions (id_exam, id_question, letters_order) VALUES ($1, $2, $3)",
          values
        );
      });

      questionsSecondDiscipline.forEach(async (question) => {
        const letters = ["A", "B", "C", "D", "E"];
        const randomLetters = [];

        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          randomLetters.push(letters[randomIndex]);
          letters.splice(randomIndex, 1);
        }
        const values = [examId, question.id, randomLetters];
        await client.query(
          "INSERT INTO exam_questions (id_exam, id_question, letters_order) VALUES ($1, $2, $3)",
          values
        );
      });

      questionsThirdDiscipline.forEach(async (question) => {
        const letters = ["A", "B", "C", "D", "E"];
        const randomLetters = [];

        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          randomLetters.push(letters[randomIndex]);
          letters.splice(randomIndex, 1);
        }
        const values = [examId, question.id, randomLetters];
        await client.query(
          "INSERT INTO exam_questions (id_exam, id_question, letters_order) VALUES ($1, $2, $3)",
          values
        );
      });

      questionsForthDiscipline.forEach(async (question) => {
        const letters = ["A", "B", "C", "D", "E"];
        const randomLetters = [];

        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          randomLetters.push(letters[randomIndex]);
          letters.splice(randomIndex, 1);
        }
        const values = [examId, question.id, randomLetters];
        await client.query(
          "INSERT INTO exam_questions (id_exam, id_question, letters_order) VALUES ($1, $2, $3)",
          values
        );
      });

      await client.query("COMMIT");
      const exam = await this.getExamById(user.id, examId);
      return exam;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  //Saves a user's answer to an exam question with validation
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
  //Completes an exam and saves all responses to the answer history
  respondExam: async function (examId, accountId) {
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
      await client.query(
        "UPDATE exams SET done = true, done_time_at = $1 WHERE id = $2",
        [new Date(), examId]
      );

      await client.query("COMMIT");

      const examResponse = await this.getExamById(accountId, examId);
      return examResponse;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  //Retrieves all exams for a user 
  getAllExams: async (accountId) => {
    try {
      let query = `
          SELECT
              e.id,
              e.limit_time,
              e.done_time_at,
              e.done,
              COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
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
                  'answer_id', eq.id_question_alternative,
                  'letters_order', eq.letters_order,
                  'answered_at', aq.answered_at,
                  'alternatives', (
                      SELECT COALESCE(jsonb_agg(
                          jsonb_build_object(
                              'id', qa.id,
                              'file', qa.file_url,
                              'alternative_text', qa.alternative_text,
                              'letter', qa.letter,
                              'is_correct', qa.is_correct
                          )
                      ) FILTER (WHERE qa.id IS NOT NULL), '[]'::jsonb)
                      FROM question_alternatives qa
                      WHERE qa.id_question = q.id
                  ),
                  'support_file', (
                      SELECT COALESCE(jsonb_agg(DISTINCT qf.file_url), '[]'::jsonb)
                      FROM question_files qf 
                      WHERE qf.id_question = q.id
                  ),
                  'support_urls', (
                      SELECT COALESCE(jsonb_agg(DISTINCT qs.support_url), '[]'::jsonb)
                      FROM question_support qs 
                      WHERE qs.id_question = q.id
                  )
              )) FILTER (WHERE q.id IS NOT NULL), '[]'::jsonb) AS questions
          FROM exams e
          LEFT JOIN exam_questions eq ON e.id = eq.id_exam
          LEFT JOIN (
              SELECT DISTINCT ON (q.id) q.*
              FROM questions q 
          ) q ON eq.id_question = q.id
          LEFT JOIN (
              SELECT DISTINCT ON (aq.id_question) aq.*
              FROM accounts_questions aq
          ) aq ON q.id = aq.id_question
          WHERE e.id_user = $1
          GROUP BY e.id, e.limit_time, e.done;
      `;

      let response = await pool.query(query, [accountId]);

      const exams = response.rows.map((exam) => {
        if (!exam.done) {
          return {
            id: exam.id,
            limit_time: exam.limit_time,
            done: false,
            questions: exam.questions.map((question) => {
              return {
                id: question.id,
                year: question.year,
                level: question.level,
                context: question.context,
                language: question.language,
                answer_id: question.answer_id,
                discipline: question.discipline,
                vestibular: question.vestibular,
                letters_order: question.letters_order,
                answered_at: question.answered_at,
                sub_discipline: question.sub_discipline,
                selected_alternative_id: question.selected_alternative_id,
                support_file: question.support_file,
                question_index: question.question_index,
                alternative_introduction: question.alternative_introduction,
                alternatives: question.alternatives.map((alternative) => {
                  return {
                    id: alternative.id,
                    letter: alternative.letter,
                    alternative_text: alternative.alternative_text,
                    file: alternative.file,
                  };
                }),
              };
            }),
          };
        }
        return exam;
      });

      exams.forEach((exam) => {
        exam.questions.sort((question1, question2) =>
          question1.discipline.localeCompare(question2.discipline)
        );
      });

      return exams;
    } catch (error) {
      throw error;
    }
  },
  //Retrieves a specific exam with detailed question data
  getExamById: async (accountId, examId) => {
    try {
      let query = `
          SELECT
              e.id,
              e.limit_time,
              e.done_time_at,
              e.done,
              COALESCE(jsonb_agg(DISTINCT jsonb_build_object(
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
                  'answer_id', eq.id_question_alternative,
                  'letters_order', eq.letters_order,
                  'answered_at', aq.answered_at,
                  'alternatives', (
                      SELECT COALESCE(jsonb_agg(
                          jsonb_build_object(
                              'id', qa.id,
                              'file', qa.file_url,
                              'alternative_text', qa.alternative_text,
                              'letter', qa.letter,
                              'is_correct', qa.is_correct
                          )
                      ) FILTER (WHERE qa.id IS NOT NULL), '[]'::jsonb)
                      FROM question_alternatives qa
                      WHERE qa.id_question = q.id
                  ),
                  'support_file', (
                      SELECT COALESCE(jsonb_agg(DISTINCT qf.file_url), '[]'::jsonb)
                      FROM question_files qf 
                      WHERE qf.id_question = q.id
                  ),
                  'support_urls', (
                      SELECT COALESCE(jsonb_agg(DISTINCT qs.support_url), '[]'::jsonb)
                      FROM question_support qs 
                      WHERE qs.id_question = q.id
                  )
              )) FILTER (WHERE q.id IS NOT NULL), '[]'::jsonb) AS questions
          FROM exams e
          LEFT JOIN exam_questions eq ON e.id = eq.id_exam
          LEFT JOIN (
              SELECT DISTINCT ON (q.id) q.*
              FROM questions q
          ) q ON eq.id_question = q.id
          LEFT JOIN (
              SELECT DISTINCT ON (aq.id_question) aq.*
              FROM accounts_questions aq
          ) aq ON q.id = aq.id_question
          WHERE e.id_user = $1 AND e.id = $2
          GROUP BY e.id, e.limit_time, e.done;
      `;
      const response = await pool.query(query, [accountId, examId]);

      let exam = response.rows[0];

      if (!exam.done) {
        exam = {
          id: exam.id,
          limit_time: exam.limit_time,
          done: false,
          questions: exam.questions.map((question) => {
            return {
              id: question.id,
              year: question.year,
              level: question.level,
              context: question.context,
              language: question.language,
              answer_id: question.answer_id,
              discipline: question.discipline,
              vestibular: question.vestibular,
              letters_order: question.letters_order,
              answered_at: question.answered_at,
              sub_discipline: question.sub_discipline,
              selected_alternative_id: question.selected_alternative_id,
              support_file: question.support_file,
              question_index: question.question_index,
              alternative_introduction: question.alternative_introduction,
              alternatives: question.alternatives.map((alternative) => {
                return {
                  id: alternative.id,
                  letter: alternative.letter,
                  alternative_text: alternative.alternative_text,
                  file: alternative.file,
                };
              }),
            };
          }),
        };
      }

      exam.questions.sort((question1, question2) =>
        question1.discipline.localeCompare(question2.discipline)
      );

      return exam;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = { examRepository };
