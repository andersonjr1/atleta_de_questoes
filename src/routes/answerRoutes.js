const router = require("express").Router();
const { answerController } = require("../controllers");

router.post("/", answerController.saveNormalAnswer);
router.get("/", answerController.getUserAnswers);
router.get("/:questionId", answerController.getSpecificAnswer);

module.exports = router;
