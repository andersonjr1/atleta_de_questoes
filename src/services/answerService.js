const { answerRepository } = require("../repositories");

const answerService = {
    saveAnswer: async (data) => {
        try {
            if (!data.accountId || !data.questionId || !data.alternativeId) {
                const error = new Error("Todos os campos são necessários");
                error.status = 400;
                throw error;
            }

            if(typeof data.isExam !== "boolean") {
                data.isExam = false;
            }

            const answer = await answerRepository.saveAnswer(data);
            return answer;
        } catch (error) {
            throw error;
        }
    },

    getUserAnswers: async (accountId) => {
        try {
            if (!accountId) {
                const error = new Error("O ID da do usuário é necessário");
                error.status = 400;
                throw error;
            }

            const answers = await answerRepository.getUserAnswers(accountId);
            return answers;
        } catch (error) {
            throw error;
        }
    },

    getSpecificAnswer: async (accountId, questionId) => {
        try {
            if (!accountId || !questionId) {
                const error = new Error("O ID do usuário e o ID da questão são necessários");
                error.status = 400;
                throw error;
            }

            const answer = await answerRepository.getSpecificAnswer(accountId, questionId);
            return answer;
        } catch (error) {
            throw error;
        }
    },

    getUserAnsweredQuestions: async (accountId, { page, limit, fromDate, toDate }) => {
        try {
            if (!accountId) {
                throw new Error("O ID do usuário é necessário");
            }

            const pagination = {
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 10
            };

            if (fromDate && isNaN(new Date(fromDate).getTime())) {
                throw new Error("Invalid fromDate format");
            }

            if (toDate && isNaN(new Date(toDate).getTime())) {
                throw new Error("Invalid fromDate format");
            }

            return await answerRepository.getUserAnsweredQuestions(
                accountId,
                {
                    ...pagination,
                    fromDate,
                    toDate
                }
            );
        } catch (error) {
            error.status = error.status || 400;
            throw error;
        }
    },
};

module.exports = { answerService };