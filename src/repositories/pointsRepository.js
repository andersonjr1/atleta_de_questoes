const { pool } = require("../config/db");
const { examRepository } = require("./examRepository");
const { userRepository } = require("./userRepository");

const pointsRepository = {
  getPointsByUser: async function (user) {
    try {
      const exams = await examRepository.getAllExams(user.id);
      let points = 0;

      exams.sort((exam1, exam2) => {
        exam1.limit_time = new Date(exam1.limit_time);
        exam2.limit_time = new Date(exam2.limit_time);
        return exam1.limit_time - exam2.limit_time;
      });

      exams.forEach((exam) => {
        let examPoints = 0;
        if (!exam.done) {
          return;
        }
        let total = 0;
        exam.questions.forEach((question) => {
          let level = question.level;
          total++;
          if (question.level == null) {
            level = 1;
          }

          if (question.answer_id === null) {
            examPoints -= level * 10;
            return;
          }

          const correctAlternative = question.alternatives.find(
            (alternative) => alternative.is_correct
          );

          if (question.answer_id === correctAlternative.id) {
            examPoints += level * 10;
          } else {
            examPoints -= level * 10;
          }
        });

        if (points + examPoints >= 0) {
          points += examPoints;
        } else {
          points = 0;
        }
      });
      let level;

      if (points < 120) {
        level = 1;
      } else if (points < 360) {
        level = 2;
      } else {
        level = 3;
      }

      await this.updateUserLevel(user.id, level);

      return { points, level, name: user.name };
    } catch (error) {
      throw error;
    }
  },
  getAllUserPoints: async function (user) {
    try {
      const userRank = await this.getPointsByUser(user);
      const leaderboard = { user: userRank, otherUsers: [] };
      const users = await userRepository.getAllUsers();
      for (const otherUser of users) {
        if (otherUser.id === user.id) {
          continue;
        }
        const otherUserRanking = await this.getPointsByUser(otherUser);
        leaderboard.otherUsers.push(otherUserRanking);
      }
      return leaderboard;
    } catch (error) {
      throw error;
    }
  },
  updateUserLevel: async function (userId, newLevel) {
    try {
      const query = 'UPDATE accounts SET level = $1 WHERE id = $2';
      await database.query(query, [newLevel, userId]);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { pointsRepository };
