const router = require("express").Router();
const { answerController } = require("../controllers/answerController.js");
const { authToken } = require("../middlewares/authMiddleware.js");

router.post("/answers", authToken, answerController.saveNormalAnswer);
router.get("/answers", authToken, answerController.getUserAnswers);
router.get(
  "/answers/:questionId",
  authToken,
  answerController.getSpecificAnswer
);
router.get("/subject-performance", authToken, answerController.getSubjectPerformance);

module.exports = router;
