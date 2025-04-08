const router = require("express").Router();
const { answerController } = require("../controllers");
const { authToken } = require("../middlewares/authMiddleware.js");

router.post("/", answerController.saveNormalAnswer);
router.get("/", answerController.getUserAnswers);
router.get("/:questionId", answerController.getSpecificAnswer);

module.exports = router;
