const router = require("express").Router();
const { answerController } = require("../controllers");

router.post("/", answerController.saveNormalAnswer);
router.get("/", answerController.getUserAnswers);
router.get("/:questionId", answerController.getSpecificAnswer);
router.get(
  "/subject-performance",
  authToken,
  answerController.getSubjectPerformance
);
router.get("/performance", authToken, answerController.getUserPerformance);

module.exports = router;
