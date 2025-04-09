const { examRepository } = require("../repositories");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/env.js");

const openExamRedirect = async (req, res, next) => {
  try {
    const token = req.cookies.SESSION_ID;
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    console.log(req.user);
    const allExams = await examRepository.getAllExams(req.user.id);
    for (const exam of allExams) {
      if (exam.done == false) {
        console.log("teste");
        res.redirect(`/simulado`);
        return;
      }
    }

    next();
  } catch (error) {}
};

module.exports = {
  openExamRedirect,
};
