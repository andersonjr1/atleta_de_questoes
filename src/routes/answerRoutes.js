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

module.exports = router;
