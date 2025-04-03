const { examRepository } = require("../repositories");

const openExam = async (req, res, next) => {
  try {
    const allExams = await examRepository.getAllExams(req.user.id);
    let id;
    for (const exam of allExams) {
      if (exam.done == false) {
        id = exam.id;
        res.status(403).json({
          message: "Acesso negado! Você está com um exame aberto. ",
          examId: id,
        });
        return;
      }
    }

    next();
  } catch (error) {}
};

module.exports = {
  openExam,
};
