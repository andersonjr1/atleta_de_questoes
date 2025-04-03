const router = require("express").Router();
const { examController } = require("../controllers/examController.js");
const { openExam } = require("../middlewares/openExam.js");
const { authToken } = require("../middlewares/authMiddleware.js");

router.get("/exam", authToken, examController.getAllExams);
router.get("/exam/:examId", authToken, examController.getExamById);
router.post("/exam", authToken, openExam, examController.createExam);
router.put("/exam/:examId", authToken, examController.respondExam);
router.put(
  "/exam/:examId/question/:questionId",
  authToken,
  examController.saveExamQuestionResponse
);

module.exports = router;
