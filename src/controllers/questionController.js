const { questionService } = require("../services");

const questionController = {
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const question = await questionService.getById(id);
            res.status(200).json(question);
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            await questionService.update(id, req.body);
            res.status(200).json({ message: "Questão atualizada com sucesso" });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ message: error.message });
        }
    }
};

module.exports = { questionController };