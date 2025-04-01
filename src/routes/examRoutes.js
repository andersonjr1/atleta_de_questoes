const router = require("express").Router();
const { examController } = require("../controllers/examController.js");
const { authToken } = require("../middlewares/authMiddleware.js");

router.get("/exam", authToken, examController.getExams);
router.get("/exam/:id", authToken, examController.getExam);
router.post("/exam", authToken, examController.createExam);
router.put("/exam/:id", authToken, examController.updateExam);
router.delete("/exam/:id", authToken, examController.deleteExam);
router.get("/exam/:id/questions", authToken, examController.getQuestions);
router.get(
  "/exam/:id/questions/:idQuestion",
  authToken,
  examController.getQuestion
);
router.put(
  "/exam/:id/questions/:idQuestion",
  authToken,
  examController.updateQuestion
);
router.delete(
  "/exam/:id/questions/:idQuestion",
  authToken,
  examController.deleteQuestion
);

module.exports = router;
