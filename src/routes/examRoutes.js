const router = require("express").Router();
const { examController } = require("../controllers/examController.js");
const { openExam } = require("../middlewares/openExam.js");
const { authToken } = require("../middlewares/authMiddleware.js");

router.get("/", examController.getAllExams);
router.get("/:examId", examController.getExamById);
router.post("/", openExam, examController.createExam);
router.put("/:examId", examController.respondExam);
router.put(
  "/:examId/question/:questionId",
  examController.saveExamQuestionResponse
);

module.exports = router;
