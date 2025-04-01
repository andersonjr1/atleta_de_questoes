const router = require("express").Router();
const { examController } = require("../controllers/examController.js");
const { authToken } = require("../middlewares/authMiddleware.js");

router.post("/exam", authToken, examController.createExam);
router.put("/exam/:examId", authToken, examController.respondExam);
router.put(
  "/exam/:examId/question/:questionId",
  authToken,
  examController.saveExamQuestionResponse
);

module.exports = router;
