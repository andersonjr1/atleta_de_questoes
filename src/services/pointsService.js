const { pointsRepository } = require("../repositories/pointsRepository");

const pointsService = {
  getPointsByUser: async (user) => {
    try {
      const result = await pointsRepository.getPointsByUser(user);

      return result;
    } catch (error) {
      throw error;
    }
  },
  getAllUserPoints: async (user) => {
    try {
      const result = await pointsRepository.getAllUserPoints(user);

      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserPerformance: async (userId, year, discipline) => {
    try {
      let query = `
        SELECT
          DATE_TRUNC('month', aq.answered_at) AS month,
          q.discipline,
          COUNT(CASE WHEN qa.is_correct THEN 1 END) AS correct_answers,
          COUNT(*) AS total_answers,
          (COUNT(CASE WHEN qa.is_correct THEN 1 END) * 100.0 / COUNT(*)) AS accuracy_percentage
        FROM accounts_questions aq
        JOIN questions q ON aq.id_question = q.id
        JOIN question_alternatives qa ON aq.id_alternative = qa.id
        WHERE aq.id_account = $1
      `;

      const params = [userId];
      let paramIndex = 2;

      if(year) {
        query += ` AND EXTRACT(YEAR FROM aq.answered_at) = $${paramIndex}`;
        params.oush(year);
        paramIndex++;
      }

      if (discipline && discipline !== 'all') {
        query += ` AND q.discipline = $${paramIndex}`;
        params.push(discipline);
        paramIndex++;
      }

      query += `
        GOUP BY month, q.discipline
        ORDER BY month, q.discipline
      `;

      const result = await pool.query(query, params);
      return result.rows;
    } catch(error) {
      throw error;
    }
  }
};

module.exports = { pointsService };
