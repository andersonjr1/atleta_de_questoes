const router = require("express").Router();
const { answerController } = require("../controllers/answerController.js");
const { authToken } = require("../middlewares/authMiddleware.js");

router.post("/answers", authToken, answerController.saveAnswer);
router.get("/answers", authToken, answerController.getUserAnswers);

module.exports = router;
