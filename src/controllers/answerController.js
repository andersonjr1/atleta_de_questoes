const { answerService } = require("../services");
const { authToken } = require("../middlewares/authMiddleware.js");

const answerController = {
    saveAnswer: async (req, res) => {
        try {
            const { questionId, alternativeId, isExam } = req.body;
            const accountId = req.user.id;

            const answer = await answerService.saveAnswer({
                accountId,
                questionId,
                alternativeId,
                isExam: isExam || false
            });

            res.status(201).json(answer);
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ message: error.message });
        }
    },

    getUserAnswers: async (req, res) => {
        try {
            const accountId = req.user.id;
            const answers = await answerService.getUserAnswers(accountId);
            res.status(200).json(answers);
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ message: error.message });
        }
    },

    getSpecificAnswer: async (req, res) => {
        try {
            const accountId = req.user.id;
            const { questionId } = req.params;

            const answer = await answerService.getSpecificAnswer(accountId, questionId);

            if (!answer) {
                return res.status(404).json({ message: "Resposta não encontrada" });
            }
            
            res.status(200).json(answer);
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ message: error.message });
        }
    },

    getAnsweredQuestions: async (req, res) => {
        try {
            const accountId = req.user.id;
            const { page, limit, from, to } = req.query;

            const answeredQuestions = await answerService.getUserAnsweredQuestions(accountId, {
                page,
                limit,
                fromDate: from,
                toDate: to
            });

            res.status(200).json({
                success: true,
                data: answeredQuestions,
                pagination: {
                    page:parseInt(page) || 1,
                    limit: parseInt(limit) || 10
                }
            });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    },
};

module.exports = { answerController };